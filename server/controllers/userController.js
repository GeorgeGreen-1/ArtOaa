import User from "../models/User.js";
import jsonTokenGenerator, { generateAccessToken } from "../utils/jwt.js";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { Notification, Review } from "../models/Arist.js";
import sendVerificationEmail from "../utils/sendVerificationEmai.js";
import generateRespond from "../utils/generateResponse.js";
import jwt from "jsonwebtoken";
import { Bid, Order } from "../models/Order.js";

// This function authenticates a user by checking their credentials against records in the database
export const authUser = asyncHandler(async (req, res, next) => {
  try {
    // Destructuring 'email' and 'password' from the request body
    const { email, password } = req.body;

    // Finding a user in the database by their email
    const user = await User.findOne({ email });

    // Checking if a user with the provided email exists and the password matches
    if (user && (await user.matchPassword(password))) {
      // Responding with successful authentication
      // generateTokenAndRespond(res, user);

      if (!user.isVerified) {
        res.status(401).send("Please verify your account");
      }

      const { accessToken } = jsonTokenGenerator(res, user);

      // Send accessToken containing username and roles
      res.json({ accessToken });
    } else {
      // Log failed authentication attempt
      console.error(`Failed authentication attempt for user: ${email}`);
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// This function handles the registration of a new user by validating input data, creating a new user record in the database, and generating a token for authentication
export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    // Destructuring user information from the request body
    const { firstName, lastName, email, password, role, artStyle, aboutMe } =
      req.body;

    // Regular expression for validating email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Validating the email format using the regular expression
    if (!emailRegex.test(email)) {
      res.status(400).send("Email is not valid");
      return;
    }

    // Checking if essential credentials are provided
    if (!firstName || !lastName || !email || !password) {
      res.status(400).send("Please provide credentials");
      return;
    }

    // Checking if a user with the provided email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      // Log registration attempt with existing email
      console.error(
        `Registration attempt failed. User with email ${email} already exists`
      );
      res.status(400).send("User already exists");
      return;
    }

    // Creating a new user in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      artStyle,
      aboutMe,
      emailToken: crypto.randomBytes(64).toString("hex"), // Generating a random email token
    });

    if (user) {
      // Log successful registration
      console.log(`User registered successfully: ${user.email}`);
      generateRespond(res, user);
      sendVerificationEmail(user);

      // Responding with user details upon successful registration
      // This is handled by the generateTokenAndRespond function
    } else {
      // Log failed registration attempt
      console.error("Registration attempt failed. Invalid user data");
      res.status(400).send("Invalid user data");
    }
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

export const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  console.log("refresh:", refreshToken);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findById(decoded.userId).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = generateAccessToken(decoded.userId);

      res.json({ accessToken });
    }
  );
};

// This function handles the logout of a user by clearing the JWT cookie, effectively invalidating the user's session
export const logoutUser = asyncHandler(async (req, res) => {
  // Clearing the JWT cookie by setting its expiration date to a past date

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });

  // Responding with a 200 status and a JSON message indicating successful user logout
  res.status(200).json({ msg: "User logged out" });
});

// This function handles the verification of a user's email by checking the provided email token, updating user properties to mark the email as verified, generating a new JSON web token, and saving the updated user details to the database
export const verifyEmail = asyncHandler(async (req, res) => {
  try {
    // Destructuring emailToken from the request body
    const { emailToken } = req.body;

    // Checking if emailToken is provided
    if (!emailToken) {
      res.status(400).send("EmailToken Not Found");
      return;
    }

    // Finding a user in the database with the provided emailToken
    const user = await User.findOne({ emailToken });

    // Checking if a user with the provided emailToken exists
    if (user) {
      // Updating user properties to mark email as verified
      user.emailToken = null; // Clearing the emailToken
      user.isVerified = true; // Setting isVerified to true

      // Log successful email verification
      console.log(`Email verified successfully for user: ${user.email}`);

      // Saving the updated user details to the database
      await user.save();

      // Responding with user details upon successful email verification
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      });
    } else {
      // Log failed email verification attempt
      console.error(`Email verification failed for token: ${emailToken}`);
      res.status(404).json({ message: "Email Verification failed" });
    }
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// Importing necessary modules and dependencies && this for testing purrposes
export const getAllUsers = asyncHandler(async (req, res) => {
  // Fetching all users from the database
  const users = await User.find();

  // Checking if any users are found
  if (users) {
    // Responding with a 200 status and a JSON object containing the list of users
    res.status(200).json({
      users,
    });
  } else {
    // Handling a case where no users are found with a 404 status and a JSON message
    return res.status(404).json("Users not found");
  }
});

export const getAllArtists = asyncHandler(async (req, res) => {
  // Fetching all artists from the database
  const artists = await User.find({
    role: "artist",
  });

  // Checking if any artists are found
  if (artists) {
    // Responding with a 200 status and a JSON object containing the list of artists
    res.status(200).json({
      artists,
    });
  } else {
    // Handling a case where no artists are found with a 404 status and a JSON message
    return res.status(404).json("Artists not found");
  }
});

// This function retrieves a user's profile information based on their user ID from the request, and responds with a JSON object containing the user's profile details
export const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user);
  // Fetching the user's profile information using their user ID from the request
  const user = await User.findById(req.user._id);

  // Checking if the user is found
  if (user) {
    // Responding with a 200 status and a JSON object containing the user's profile details
    if (user.role === "artist") {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage.path,
        role: user.role,
        isVerified: user.isVerified,
        personalProjects: user.personalProjects.map((project) => ({
          _id: project._id,
          path: project.path,
        })),
        artStyle: user.artStyle,
        aboutMe: user.aboutMe,
        notifications: user.notifications,
        reviews: user.reviews,
      });
    } else {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage.path,
        role: user.role,
        isVerified: user.isVerified,
        notifications: user.notifications,
        orders: user.orders,
      });
    }
  } else {
    // Handling a case where the user is not found with a 404 status and throwing an error
    res.status(404);
    throw new Error("User not found");
  }
});

// This function retrieves a user's  information based on their user ID from the request, and responds with a JSON object containing the user's profile details
export const getUserById = asyncHandler(async (req, res) => {
  // Fetching the user's information using their user ID from the request
  const user = await User.findById(req.params.id);

  // Checking if the user is found
  if (user) {
    // Responding with a 200 status and a JSON object containing the user's details

    if (user.role === "artist") {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage.path,
        role: user.role,
        personalProjects: user.personalProjects.map((project) => ({
          _id: project._id,
          path: project.path,
        })),
        artStyle: user.artStyle,
        aboutMe: user.aboutMe,
        reviews: user.reviews,
      });
    } else {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage.path,
        role: user.role,
        orders: user.orders,
      });
    }
  } else {
    // Handling a case where the user is not found with a 404 status and throwing an error
    res.status(404);
    throw new Error("User not found");
  }
});

// This function retrieves a user's  information based on their user ID from the request, and responds with a JSON object containing the user's profile details
export const deleteUserById = asyncHandler(async (req, res) => {
  // Fetching the user's information using their user ID from the request
  try {
    // Fetching the user's information using their user ID from the request
    await User.findByIdAndDelete(req.params.id);
    const orders = await Order.deleteMany({ user: req.params.id });
    const notificatins = await Notification.deleteMany({ user: req.params.id });
    const bids = await Bid.deleteMany({ user: req.params.id });
    const reviews = await Review.deleteMany({ user: req.params.id });

    res.status(200).json({
      message: "User, associated artist, and orders deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user, associated artist, and orders" });
  }
});

// This function updates a user's profile information based on the provided request body, including name, email, profile image, and password. It also handles file uploads for profile images if included in the request. Upon successful update, it responds with a 201 status and a JSON object containing the updated user profile details
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    // Fetching the user's profile information using their user ID from the request
    const user = await User.findById(req.user._id);

    // Checking if the user is found
    if (user) {
      // Updating user information based on the provided request body
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password; //separate functio for that patch
      user.artStyle = req.body.artStyle || user.artStyle;
      user.description = req.body.description || user.description;
      user.aboutMe = req.body.aboutMe || user.aboutMe;

      let profileImage;

      // Check if profileImage was uploaded
      if (
        req.files &&
        req.files["profileImage"] &&
        req.files["profileImage"].length > 0 &&
        req.files["profileImage"][0]
      ) {
        profileImage = {
          data: req.files["profileImage"][0].path,
          contentType: req.files["profileImage"][0].mimetype,
          path: req.files["profileImage"][0].path,
        };

        user.profileImage = profileImage || user.profileImage;
      }

      // Saving the updated user details to the database
      await user.save();

      // Responding with a 201 status and a JSON object containing the updated user profile
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage.path,
        personalProjects: user.personalProjects.map((project) => ({
          _id: project._id,
          path: project.path,
        })),
        artStyle: user.artStyle,
        aboutMe: user.aboutMe,
        description: user.description,
      });
    } else {
      // Log failed user profile update attempt
      console.error("User profile update failed: User not found");
      res.status(404).send("User not found");
    }
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    if (!(await user.matchPassword(currentPassword, user.password))) {
      return res.status(401).json({ msg: "Your current password is wrong" });
    }

    user.password = newPassword;
    await user.save();

    res.status(201).json({ msg: "password changed" });
  } catch (error) {
    console.log(error);
  }
};

export const uploadPersonalProjects = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role === "customer") {
      return res.status(400).json({
        msg: "You are a customer. You cannot upload personal projects",
      });
    }

    if (user) {
      if (
        req.files &&
        req.files["personalProjects"] &&
        req.files["personalProjects"].length > 0 &&
        req.files["personalProjects"][0]
      ) {
        const newProjects = req.files["personalProjects"].map((file) => {
          const { path, mimetype } = file;
          return {
            data: path,
            mimetype: mimetype,
            path: path,
          };
        });

        user.personalProjects = user.personalProjects.concat(newProjects);
      }

      await user.save();

      res.status(201).json({
        personalProjects: user.personalProjects.map((project) => ({
          _id: project._id,
          path: project.path,
        })),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// This function handles the creation of a new review
export const createReview = asyncHandler(async (req, res, next) => {
  try {
    // Extracting rating and comment from the request body
    const { rating, comment } = req.body;

    // Finding the artist by the user ID provided in the request parameters
    const user = await User.findById(req.params.id);

    // Checking if the artist is trying to review themselves
    if (user._id.toString() === req.user._id.toString()) {
      throw new Error("You cannot review yourself");
    }

    // If the artist is found
    if (user && user.role === "artist") {
      // Checking if the user has already reviewed the artist
      const alreadyReviewed = user.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      // If the user has already reviewed the artist, respond with a 400 status and throw an error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Already reviewed");
      }

      // Creating a new review
      const review = await Review.create({
        artistId: user._id,
        rating: Number(rating),
        comment,
        user: req.user._id,
      });

      // If the review is created
      if (review) {
        // Adding the review to the artist's reviews array
        user.reviews.push(review);

        // Updating the number of reviews for the artist
        user.numReviews = Number(user.reviews.length);

        // Calculating the average rating for the artist
        user.rating =
          user.reviews.reduce((acc, review) => acc + review.rating, 0) /
          user.reviews.length;

        // Saving the changes to the artist
        await user.save();

        // Responding with a 200 status and a JSON message
        res.status(200).json({ msg: "Review added" });
      } else {
        // If the review is not created, respond with a 404 status and throw an error
        res.status(404);
        throw new Error("Review not created");
      }
    } else {
      // If the artist is not found, respond with a 404 status and throw an error
      res.status(404);
      throw new Error("Resource not found");
    }
  } catch (error) {
    // Handling errors and responding with a 400 status and a JSON error message
    res.status(400).json({ error: error.message });
  }
});

// This function displayes a review based on the ID provided in the request parameters
export const getReview = asyncHandler(async (req, res) => {
  // Fetching the review information using their user ID from the request
  const review = await Review.findById(req.params.id);

  // Checking if the review is found
  if (review) {
    // Responding with a 200 status and a JSON object containing the review details
    res.status(200).json({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
    });
  } else {
    // Handling a case where the review is not found with a 404 status and throwing an error
    res.status(404);
    throw new Error("Review not found");
  }
});

// This function updates a review based on the ID provided in the request parameters
export const updateReview = asyncHandler(async (req, res, next) => {
  try {
    // Fetching the review information using the provided ID from the request parameters
    const review = await Review.findById(req.params.id);

    // Checking if the review is found
    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    // Checking if the user is authorized to update the review
    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("You are not authorized to update this review");
    }

    // Updating review information based on the provided request body
    review.name = req.body.name || review.name;
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    // Saving the updated review details to the database
    await review.save();

    // Update the artist document to reflect the updated review

    const user = await User.findOneAndUpdate(
      {
        _id: review.artistId,
        "reviews._id": review._id,
      },
      {
        $set: {
          "reviews.$[elem].rating": review.rating,
          "reviews.$[elem].comment": review.comment,
        },
      },
      {
        new: true,
        arrayFilters: [{ "elem._id": review._id }],
      }
    ).catch((error) => {
      console.log("Error fetching user:", error);
    });

    console.log("User Before Update:", user);
    console.log("Review User ID:", review.user);
    console.log("Review ID:", review._id);

    // If the artist document is not found or does not contain the 'reviews' field, respond with a 404 status and throw an error
    if (!user) {
      res.status(404);
      throw new Error("Artist not found or missing 'reviews' field");
    }

    // Responding with a 200 status and a JSON object containing the updated review
    res.status(200).json({
      _id: review._id,
      name: review.name,
      rating: review.rating,
      comment: review.comment,
    });
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
});

// This function deletes a review based on the ID provided in the request parameters
export const deleteReview = asyncHandler(async (req, res) => {
  try {
    const reviewId = req.params.id.replace(/\W/g, "");

    // Finding the review by its ID
    const review = await Review.findById(req.params.id);

    console.log(review);

    // If the review with the provided ID is not found, respond with a 404 status and throw an error
    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    // Delete the review from the reviews collection
    await Review.deleteOne({ _id: req.params.id });

    // Find the artist document using the user ID associated with the review
    const artist = await User.findOneAndUpdate(
      { _id: review.artistId }, // Assuming review.user is the user's ID
      { $pull: { reviews: { _id: review._id } } },
      { new: true }
    );

    // If the artist document is not found, respond with a 404 status and throw an error
    if (!artist) {
      res.status(404);
      throw new Error("Artist not found");
    }

    // If the review is successfully deleted, respond with a 200 status and a JSON message
    res.status(200).json({ msg: "Review deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the review" });
  }
});
