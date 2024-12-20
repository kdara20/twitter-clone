import express from "express";
import { getMe, signup, login, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
// 1st part before putting it in the auth.controller.js

// router.post("/signup", (req, res) => {
//   res.json({
//     data: "you hit the signup endpoint",
//   });
// });

// router.post("/login", (req, res) => {
//   res.json({
//     data: "you hit the login endpoint",
//   });
// });

// router.post("/logout", (req, res) => {
//   res.json({
//     data: "you hit the logout endpoint",
//   });
// });
router.get("/me", protectRoute, getMe);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
