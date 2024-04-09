import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ReviewSchema } from "./Arist.js";
import { OrderSchema } from "./Order.js";

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    profileImage: {
      data: Buffer,
      contentType: String,
      path: String,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "artist"],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailToken: { type: String },
    spentMoney: { type: Number },
    proposals: { type: Number },

    artStyle: [
      {
        name: {
          type: String,
        },
      },
    ],
    aboutMe: {
      type: String,
    },
    personalProjects: [
      {
        data: Buffer,
        contentType: String,
        path: String,
      },
    ],
    numReviews: {
      type: Number,
    },

    rating: {
      type: Number,
    },
    numReviews: {
      type: Number,
    },
    reviews: [ReviewSchema],
    notifications: [mongoose.Schema.Types.Mixed],
    orders: [OrderSchema],
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;
