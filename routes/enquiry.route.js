import express from "express";
import { createDetailsCtr } from "../controllers/enquiry.controller.js";
const router = express.Router();
router.post("/details", createDetailsCtr);
export default router;
