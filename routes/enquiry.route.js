import express from "express";
import {
  createDetailsCtr,
  getAllEnquiresCtrl,
  deleteEnquiryByIdCtrl,
} from "../controllers/enquiry.controller.js";
const router = express.Router();
router.get("/details", getAllEnquiresCtrl);
router.post("/details", createDetailsCtr);
router.delete("/details/:id", deleteEnquiryByIdCtrl);
export default router;
