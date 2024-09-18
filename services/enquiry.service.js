import { Enquires } from "../entities/enquiry.entity.js";

async function createDetails(addDetails) {
  await Enquires.create(addDetails).go();
}
export { createDetails };
