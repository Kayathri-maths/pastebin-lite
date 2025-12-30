import express from "express";
import {
  healthz,
  createPaste,
  fetchPaste,
  viewPasteHTML
} from "../controllers/pasteController.js";

const router = express.Router();

router.get("/api/healthz", healthz);
router.post("/api/pastes", createPaste);
router.get("/api/pastes/:id", fetchPaste);
router.get("/p/:id", viewPasteHTML);

export default router;
