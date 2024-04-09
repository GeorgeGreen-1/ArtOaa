import mongoose from "mongoose";

export const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },

    order: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Order",
    },

    bid: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Bid",
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },

    artistId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },

    rating: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", ReviewSchema);

export const Notification = mongoose.model("Notification", NotificationSchema);
