import asyncHandler from "express-async-handler";
import { Bid, Order } from "../models/Order.js";
import { Notification } from "../models/Arist.js";
import User from "../models/User.js";

//@desc Create a new notification
//@route POST /api/orders/bids/:id/artistId/orderId
//@access Private/Artist

// This function handles the creation of a new notification
const createNotification = asyncHandler(async (req, res, next) => {
  try {
    // Extracting rating and comment from the request body
    const { location, date, phoneNumber } = req.body;

    // Finding the bid by the bidId in the request parameters
    const bid = await Bid.findById(req.params.id);

    // Finding the artist by the user ID provided in the request parameters
    const user = await User.findOne({ _id: bid.user });

    // Finding the order by the orderId in the request parameters
    const order = await Order.findById(req.params.orderId);

    // If the order, bid, artist is found
    if (user && bid && order) {
      // Creating a new notification
      const notification = await Notification.create({
        user: req.user._id,
        bid: bid._id,
        order: order._id,
        location,
        date,
        phoneNumber,
      });

      // If the notification is created
      if (notification) {
        // Adding the notification to the artists's notificatins array
        user.notifications.push(notification);

        // Saving the changes to the artist
        await user.save();

        // Responding with a 200 status and a JSON message
        res.status(200).json({ msg: "Notification sent" });
      } else {
        // If the notification is not created, respond with a 404 status and throw an error
        res.status(404);
        throw new Error("Notification not created");
      }
    } else {
      // If the order, bid and artist are not found, respond with a 404 status and throw an error
      res.status(404);
      throw new Error("Resource not found");
    }
  } catch (error) {
    // Handling errors and responding with a 400 status and a JSON error message
    res.status(400).json({ error: error.message });
  }
});

export { createNotification };
