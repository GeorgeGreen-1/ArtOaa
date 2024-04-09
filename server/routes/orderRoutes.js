import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import {
  chooseBid,
  createBid,
  createOrder,
  deleteBid,
  getAllBids,
  getAllOrders,
  getBidById,
  getOrderById,
  updateBid,
} from "../controllers/orderController.js";
import { createNotification } from "../controllers/notificationsController.js";

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    upload.fields([{ name: "wallImage", maxCount: 1 }]),
    createOrder
  )
  .get(getAllOrders);
router.route("/bids").get(getAllBids);

router
  .route("/:id")
  .post(protect, createBid)
  .get(getOrderById)
  .patch(protect, chooseBid);
router
  .route("/bid/:id")
  .patch(protect, updateBid)
  .delete(protect, deleteBid)
  .get(getBidById);
router.route("/bid/:id/:orderId").post(protect, createNotification);

export default router;
