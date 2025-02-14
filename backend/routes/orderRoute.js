import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { listOrders, placeOrder, updateOrderStatus, userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", userOrders);
orderRouter.get("/listorders", listOrders);
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;