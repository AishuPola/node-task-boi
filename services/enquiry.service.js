import { Enquires } from "../entities/enquiry.entity.js";

async function createDetails(addDetails) {
  await Enquires.create(addDetails).go();
}

async function getAllEnquires() {
  return (await Enquires.scan.go()).data;
}
export { createDetails, getAllEnquires };
