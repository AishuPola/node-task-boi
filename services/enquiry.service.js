import { Enquires } from "../entities/enquiry.entity.js";

async function createDetails(addDetails) {
  await Enquires.create(addDetails).go();
}

async function getAllEnquires() {
  return (await Enquires.scan.go()).data;
}
async function deleteEnquiryById(id) {
  await Enquires.delete({ id: id }).go();
}

async function getEnquiryById(id) {
  return await Enquires.get({ id: id }).go();
}
async function updateEnquiryById(id, updatedDetails) {
  return await Enquires.update({ id }).set(updatedDetails).go();
}
export {
  createDetails,
  getAllEnquires,
  deleteEnquiryById,
  getEnquiryById,
  updateEnquiryById,
};
