import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  package: {
    type: String,
  },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
