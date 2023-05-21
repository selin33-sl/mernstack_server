import express from "express";
import {
  createOrder,
  getAdminOrders,
  getMyOrderDetails,
  getMyOrders,
  proccessOrder,
  processPayment,
} from "../controllers/order.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, createOrder);
router.post("/payment", isAuthenticated, processPayment);

router.get("/my", isAuthenticated, getMyOrders);
router.get("/admin", isAuthenticated, isAdmin, getAdminOrders);

router
  .route("/single/:id")
  .get(isAuthenticated, getMyOrderDetails)
  .put(isAuthenticated, isAdmin, proccessOrder);

export default router;
