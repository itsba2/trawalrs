import { Router } from "express";
import passport from "passport";

import {
  registerUser,
  loginUser,
  logoutUser,
  checkUser,
} from "../controllers/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.get("/logout", logoutUser);
router.get("/check", checkUser);
export default router;
