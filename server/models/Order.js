import mongoose from "mongoose";
import { UserSchema } from "./User.js";

const BidSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    author: {},

    offer: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },

    coverLetter: {
      type: String,
      required: true,
    },

    isChosen: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

export const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    artStyle: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],

    businessType: {
      type: String,
      required: true,
      enum: ["Individual", "Corporate"],
    },
    artPosition: {
      type: String,
      required: true,
      enum: ["Interior", "Exterior"],
    },
    artDimension: {
      type: String,
      required: true,
    },
    artLocation: {
      type: String,
      required: true,
    },
    bids: [BidSchema],
    wallImage: {
      data: Buffer,
      contentType: String,
      path: String,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Bid = mongoose.model("Bid", BidSchema);
export const Order = mongoose.model("Order", OrderSchema);
