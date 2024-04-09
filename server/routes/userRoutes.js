import express from "express";
import {
  registerUser,
  authUser,
  logoutUser,
  verifyEmail,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  createReview,
  updateReview,
  getReview,
  deleteReview,
  refresh,
  getUserById,
  deleteUserById,
  changePassword,
  uploadPersonalProjects,
  getAllArtists,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    registerUser,
    protect
  )
  .get(getAllUsers);

router.route("/login").post(authUser);
router.route("/logout").post(logoutUser);
router.route("/refresh").get(refresh);

router.route("/verify-email").post(verifyEmail);
router.route("/artists").get(getAllArtists);
router.route("/change-password").patch(protect, changePassword);
router
  .route("/upload-projects")
  .post(
    protect,
    upload.fields([{ name: "personalProjects", maxCount: 20 }]),
    uploadPersonalProjects
  );

router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(
    protect,
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    updateUserProfile
  );

router.route("/:id/reviews").post(protect, createReview);
router
  .route("/reviews/:id")
  .get(protect, getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);
router.route("/:id").get(getUserById).delete(deleteUserById);

export default router;
