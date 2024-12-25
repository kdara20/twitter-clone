import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { deleteNotifications, getNotifications, /*deleteNotification*/ } from '../controllers/notification.controller.js';

const router = express.Router();

// two end points
router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
//delete each notification
// router.delete("/:id", protectRoute, deleteNotification);

export default router;
