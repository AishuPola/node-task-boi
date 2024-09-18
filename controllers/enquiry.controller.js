import { createDetails } from "../services/enquiry.service.js";
import { v4 as uuidv4 } from "uuid";
async function createDetailsCtr(request, response) {
  const data = request.body;
  const addDetails = {
    ...data,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  };
  try {
    await createDetails(addDetails);

    response.status(201).send(addDetails);
  } catch (error) {
    response.status(500).send("failed to add details"); //something bad happend on serve is 500
  }
}

export { createDetailsCtr };
