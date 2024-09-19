import express from "express";
import {
  createDetailsCtr,
  getAllEnquiresCtrl,
} from "../controllers/enquiry.controller.js";
const router = express.Router();
router.get("/details", getAllEnquiresCtrl);
router.post("/details", createDetailsCtr);
export default router;
