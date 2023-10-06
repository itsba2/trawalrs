import { Router } from "express";

import {
  addNewWalr,
  getWalrs,
  deleteWalr,
  getWalrImages,
} from "../controllers/walrs.js";

const router = Router();

router.post("/", addNewWalr);
router.get("/", getWalrs);
router.get("/images", getWalrImages);
router.delete("/:id", deleteWalr);

export default router;
