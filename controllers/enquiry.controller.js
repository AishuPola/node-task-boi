import {
  createDetails,
  getAllEnquires,
  getEnquiryById,
  deleteEnquiryById,
  updateEnquiryById,
} from "../services/enquiry.service.js";
import { v4 as uuidv4 } from "uuid";
import {
  sendBookingConfirmation,
  sendingUserDetailsToAdmin,
  sendPackageSelectionConfirmation,
} from "../services/email.service.js";

async function getAllEnquiresCtrl(request, response) {
  try {
    response.send(await getAllEnquires());
  } catch (error) {
    response.send("enquires  not loaded");
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
    console.log(addDetails);
    console.log(addDetails.fullname);
    await sendBookingConfirmation(addDetails.email, addDetails.fullname);
    await sendingUserDetailsToAdmin(addDetails);

    response.status(201).send(addDetails);
  } catch (error) {
    response.status(500).send("failed to add details or send email");
  }
}

async function deleteEnquiryByIdCtrl(request, response) {
  const { id } = request.params;
  // console.log(id)
  try {
    const res = await getEnquiryById(id);
    if (res.data) {
      await deleteEnquiryById(id);
      response.send({ msg: "deleted successfully", data: res.data });
    } else {
      response.status(404).send({ msg: "details of the person not found" });
    }
  } catch (error) {
    response.status(500).send("deleted failed");
  }
}

async function updateEnquiryByIdCtrl(request, response) {
  const { id } = request.params;
  const updatedDetails = request.body;

  try {
    const existingEnquiry = await getEnquiryById(id);
    console.log(existingEnquiry.data.email);

    if (existingEnquiry.data) {
      await updateEnquiryById(id, updatedDetails);

      const updatedEnquiry = await getEnquiryById(id);

      await sendPackageSelectionConfirmation(
        existingEnquiry.data.email,
        updatedDetails.package,
        existingEnquiry.data.fullname
      );

      response.status(200).send(updatedEnquiry);
    } else {
      response.status(404).send({ msg: "Enquiry not found" });
    }
  } catch (error) {
    console.error("Error updating enquiry:", error);
    response.status(500).send("Failed to update enquiry");
  }
}

export {
  createDetailsCtr,
  getAllEnquiresCtrl,
  deleteEnquiryByIdCtrl,
  updateEnquiryByIdCtrl,
};
