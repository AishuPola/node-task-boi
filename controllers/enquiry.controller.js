import { createDetails, getAllEnquires } from "../services/enquiry.service.js";
import { v4 as uuidv4 } from "uuid";
import { sendBookingConfirmation } from "../services/email.service.js";

async function getAllEnquiresCtrl(request, response) {
  try {
    response.send(await getAllEnquires());
  } catch (error) {
    //call back funtion we have req and res
    response.send("movies not loaded");
  }
}

async function createDetailsCtr(request, response) {
  const data = request.body;
  const addDetails = {
    ...data,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  };
  try {
    await createDetails(addDetails);
    await sendBookingConfirmation(addDetails.email);

    response.status(201).send(addDetails);
  } catch (error) {
    response.status(500).send("failed to add details or send email"); //something bad happend on serve is 500
  }
}

export { createDetailsCtr, getAllEnquiresCtrl };
