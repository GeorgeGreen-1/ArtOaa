import asyncHandler from "express-async-handler";
import { Order, Bid } from "../models/Order.js";
import User from "../models/User.js";

//@desc Create a new order
//@route POST /api/orders
//@access Private

// This function handles the creation of an order
const createOrder = asyncHandler(async (req, res) => {
  // Destructure necessary fields from the request body: businessType, artPosition, artDimension, artLocation.
  const {
    businessType,
    artPosition,
    artDimension,
    artLocation,
    artStyle,
    description,
  } = req.body;

  let wallImage;

  if (
    req.files &&
    req.files["wallImage"] &&
    req.files["wallImage"].length > 0 &&
    req.files["wallImage"][0]
  ) {
    // console.log(req.files["profileImage"]);
    // profileImage = req.files["profileImage"][0].path || "";
    wallImage = {
      data: req.files["wallImage"][0].path,
      contentType: req.files["wallImage"][0].mimetype,
      path: req.files["wallImage"][0].path,
    };
  } else {
    wallImage = {};
  }

  // Create a new Order instance with the extracted fields along with the user ID retrieved from the request.
  const order = new Order({
    user: req.user._id, // Assign the ID of the authenticated user to the order.
    businessType, // Store the type of business associated with the order.
    artDimension, // Store the dimensions of the artwork.
    artPosition, // Store the position where the artwork will be placed.
    artLocation, // Store the location where the artwork will be installed.
    artStyle,
    description,
    wallImage: wallImage,
  });

  const user = await User.findById(req.user._id);

  if (user.role === "artist") {
    throw new Error("You are an artist, You cannot create an order");
  }

  const artists = await User.find({
    role: "artist",
    "artStyle.name": order.artStyle.map((style) => style.name),
  }).exec();

  // Save the created order to the database and await the operation to complete.
  const createOrder = await order.save();

  user.orders.push(createOrder);

  await user.save();

  const createdAt = new Date(createOrder.createdAt);
  const date = createdAt.getDate(); // returns the day of the month (1-31)
  const month = createdAt.getMonth() + 1; // months are zero-based (0-11), so we add 1
  const year = createdAt.getFullYear(); // returns the year (four digits)

  artists.forEach(async (artist) => {
    artist.notifications.push({
      _id: createOrder._id,
      firstName: user.firstName,
      lastName: user.lastName,
      artLocation,
      createdAt: `${date}/${month}/${year}`,
    });
    await artist.save(); // Save each artist's updated document
  });

  // Respond with a status of 201 (Created) and send the created order object in the response.
  res.status(201).json({
    _id: order._id,
    user: req.user._id, // Assign the ID of the authenticated user to the order.
    businessType, // Store the type of business associated with the order.
    artDimension, // Store the dimensions of the artwork.
    artPosition, // Store the position where the artwork will be placed.
    artLocation, // Store the location where the artwork will be installed.
    artStyle,
    description,
    wallImage: wallImage.path,
  });
});

//@desc Get all orders
//@route GET /api/orders
//@access Private/Artist/User

// This function handles the retrieval of all orders
const getAllOrders = asyncHandler(async (req, res) => {
  // Retrieve all orders from the database, populating the "user" field with only the "name" and "email" properties.
  const orders = await Order.find({}).populate("user", "name email spentMoney");

  // Respond with a status of 200 (OK) and send the retrieved orders in the response.
  res.status(200).json(orders);
});

//@desc Get order by id
//@route GET /api/orders/:id
//@access Private/Artist/User

// This function handles the retrieval of a order by its id
const getOrderById = asyncHandler(async (req, res) => {
  // Attempt to find an order in the database by its ID, which is extracted from the request parameters.
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email spentMoney proposals"
  );

  // If no order is found with the provided ID, set the response status to 404 (Not Found)
  // and throw an error with a message indicating that the order was not found.
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // If an order is found, respond with a status of 200 (OK) and send the retrieved order in the response.
  res.status(200).json(order);
});

//@desc Create a bid
//@route POST /api/orders/:id
//@access Private/Artist

// This function handles the creation of a new bid
const createBid = asyncHandler(async (req, res, next) => {
  try {
    // Extracting rating and comment from the request body
    const { offer, coverLetter } = req.body;

    // Finding the order by the user ID provided in the request parameters
    const order = await Order.findById(req.params.id);

    const userArtist = await User.findOne({ _id: req.user._id });

    const dimensions = order.artDimension.split("/");

    // Converting the first element to a number
    const firstValue = parseInt(dimensions[0], 10);

    const { firstName, lastName, artStyle, aboutMe, profileImage } = userArtist;

    // If the order is found
    if (order) {
      // Creating a new bid
      const bid = await Bid.create({
        user: req.user._id,
        author: {
          firstName,
          lastName,
          artStyle,
          aboutMe,
          profileImage: profileImage.path,
        },
        order: order._id,
        offer: Number(offer),
        coverLetter,
        totalPrice: offer * firstValue,
      });

      if (userArtist.role === "user") {
        throw new Error("You are an user, You cannot create a bid");
      }

      // If the bid is created
      if (bid) {
        // Adding the bid to the order's reviews array
        order.bids.push(bid);

        // Saving the changes to the order
        await order.save();

        // Responding with a 200 status and a JSON message
        res.status(200).json({ msg: "Bid added" });
      } else {
        // If the bid is not created, respond with a 404 status and throw an error
        res.status(404);
        throw new Error("Bid not created");
      }
    } else {
      // If the order is not found, respond with a 404 status and throw an error
      res.status(404);
      throw new Error("Resource not found");
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ error: "Order validation failed", details: error.errors });
    } else {
      // Handling other errors and responding with a 400 status and a JSON error message
      res.status(400).json({ error: error.message });
    }
  }
});

export const chooseBid = asyncHandler(async (req, res) => {
  try {
    const { bidId } = req.body;
    const order = await Order.findById(req.params.id);

    const chosenBid = await Bid.findById(bidId);

    if (chosenBid) {
      chosenBid.isChosen = true;

      await chosenBid.save();

      // Filter out other bids which are not chosen
      order.bids = order.bids.filter((bid) => bid._id.equals(chosenBid._id));

      await order.save();

      res.status(201).json({ msg: "Bid chosen" });
    } else {
      throw new Error("Bid not found");
    }
  } catch (error) {
    console.log(error.message);
  }
});

//@desc Get all orders
//@route GET /api/bids
//@access Private/Artist

// This function handles the retrieval of all bids
const getAllBids = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve all bids from the database.
    const bids = await Bid.find({}).populate(
      "user",
      "firstName lastName profileImage artStyle aboutMe"
    );

    // Respond with a status of 200 (OK) and send the retrieved bids in the response.
    res.status(200).json(bids);
  } catch (error) {
    // If an error occurs during the database operation, respond with a status of 400 (Bad Request)
    // and send an error message in the response.
    res.status(400).json({ error: error.message });
  }
});

//@desc Get bid by id
//@route GET /api/bids/:id
//@access Private/Artist

// This function handles the retrieval of a bid by its id
const getBidById = asyncHandler(async (req, res, next) => {
  try {
    // Attempt to find a bid in the database by its ID, which is extracted from the request parameters.
    const bid = await Bid.findById(req.params.id);

    console.log(bid);
    // If no bid is found with the provided ID, set the response status to 404 (Not Found)
    // and throw an error with a message indicating that the bid was not found.
    if (!bid) {
      res.status(404);
      throw new Error("Bid not found");
    }

    // If a bid is found, respond with a status of 200 (OK) and send the retrieved bid in the response.
    res.status(200).json(bid);
  } catch (error) {
    // If an error occurs during the database operation or the bid is not found,
    // respond with a status of 400 (Bad Request) and send an error message in the response.
    res.status(400).json({ error: error.message });
  }
});

//@desc Update bid
//@route PUT /api/orders/bids/:id
//@access Private/Artist

// This function updates a bid based on the ID provided in the request parameters
const updateBid = asyncHandler(async (req, res, next) => {
  try {
    // Fetching the bid information using the provided ID from the request parameters
    const bid = await Bid.findById(req.params.id);

    let order = await Order.findOne({ _id: bid.order });

    const userArtist = await User.findOne({ _id: req.user._id });

    // Checking if the bid is found
    if (!bid) {
      res.status(404);
      throw new Error("Bid not found");
    }

    if (userArtist.role === "user") {
      throw new Error("You are an user, You cannot update a bid");
    }

    // Checking if the user is authorized to update the bid
    if (bid.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("You are not authorized to update this bid");
    }

    // Updating bid information based on the provided request body
    bid.offer = req.body.price || bid.offer;

    // Saving the updated bid details to the database
    await bid.save();

    order = await Order.findOneAndUpdate(
      { user: order.user },
      {
        $set: {
          "bids.$[elem].offer": bid.offer,
        },
      },
      { new: true, arrayFilters: [{ "elem._id": bid._id }] }
    );

    // If the order document is not found, respond with a 404 status and throw an error
    if (!order) {
      res.status(404);
      throw new Error("Artist not found");
    }

    // Responding with a 200 status and a JSON object containing the updated bid
    res.status(200).json({
      _id: bid._id,
      offer: bid.offer,
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

//@desc Delete bid
//@route DELETE /api/orders/bids/:id
//@access Private/Artist

// This function deletes a bid based on the ID provided in the request parameters
const deleteBid = asyncHandler(async (req, res, next) => {
  try {
    const bidId = req.params.id.replace(/\W/g, "");

    // Finding the bid by its ID
    const bid = await Bid.findById(bidId);

    let order = await Order.findOne({ _id: bid.order });

    const userArtist = await User.findOne({ _id: req.user._id });

    // If the bid with the provided ID is not found, respond with a 404 status and throw an error
    if (!bid) {
      res.status(404);
      throw new Error("Bid not found");
    }

    if (userArtist.role === "user") {
      throw new Error("You are an user, You cannot delete a bid");
    }
    // Delete the bid from the reviews collection
    await Bid.deleteOne({ _id: req.params.id });

    // Find the order document using the user ID associated with the bid
    order = await Order.findOneAndUpdate(
      { user: order.user }, // Assuming bid.user is the user's ID
      { $pull: { bids: { _id: bid._id } } },
      { new: true }
    );

    // If the order document is not found, respond with a 404 status and throw an error
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // If the bid is successfully deleted, respond with a 200 status and a JSON message
    res.status(200).json({ msg: "Bid deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    next(error);
  }
});

export {
  createOrder,
  getAllOrders,
  createBid,
  updateBid,
  deleteBid,
  getAllBids,
  getBidById,
  getOrderById,
};
