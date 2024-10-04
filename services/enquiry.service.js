import Enquiry from "../entities/enquiry.entity.js";

export async function createDetails(addDetails) {
  const enquiry = new Enquiry(addDetails);
  return await enquiry.save();
}

export async function getAllEnquires() {
  return await Enquiry.find();
}

export async function deleteEnquiryById(id) {
  return await Enquiry.findByIdAndDelete(id);
}

export async function getEnquiryById(id) {
  return await Enquiry.findById(id);
}

export async function updateEnquiryById(id, updatedDetails) {
  return await Enquiry.findByIdAndUpdate(id, updatedDetails, { new: true });
}
