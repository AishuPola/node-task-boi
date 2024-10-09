import Joi from "joi";

import {
  createDetails,
  getAllEnquires,
  getEnquiryById,
  deleteEnquiryById,
  updateEnquiryById,
} from "../services/enquiry.service.js";
import { v4 as uuidv4 } from "uuid";
import {
  sendingUserDetailsToAdmin,
  sendingUpdatePackageToAdmin,
  sendingDetailsToAdminAfterPackage,
} from "../services/email.service.js";

const packageTypes = {
  GOLD: "gold",
  DIAMOND: "diamond",
  PLATINUM: "platinum",
};
const enquiryValidationSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  phone_number: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required(),
  email: Joi.string().email().required(),
  state: Joi.string().min(2).required(),
  company: Joi.string().min(2).required(),
  package: Joi.string()
    .valid(...Object.values(packageTypes), ...Object.keys(packageTypes))
    .optional(),
});
const getISTTime = () => {
  const options = {
    timeZone: "Asia/Kolkata",
    hour12: false,
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    ...options,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
  return `${formattedDate} IST`;
};

export async function getAllEnquiresCtrl(req, res) {
  try {
    const enquires = await getAllEnquires();
    res.json(enquires);
  } catch (error) {
    res.status(500).json({ error: "Failed to load enquiries" });
  }
}

export async function createDetailsCtr(req, res) {
  const { error, value } = enquiryValidationSchema.validate(req.body);

  if (error) {
    // Return a 400 status code with the validation error message
    return res.status(400).json({ error: error.details[0].message });
  }

  const data = value;
  const addDetails = {
    ...data,
    id: uuidv4(),
    timestamp: getISTTime(),
  };
  try {
    const createdEnquiry = await createDetails(addDetails);
    if (data.package) {
      await sendingDetailsToAdminAfterPackage(addDetails);
    } else {
      await sendingUserDetailsToAdmin(createdEnquiry);
    }
    res.json(createdEnquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to create enquiry" });
  }
}

export async function deleteEnquiryByIdCtrl(req, res) {
  try {
    const id = req.params.id;
    const deleted = await deleteEnquiryById(id);
    if (!deleted) return res.status(404).json({ error: "Enquiry not found" });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete enquiry" });
  }
}

export async function updateEnquiryByIdCtrl(req, res) {
  try {
    const id = req.params.id;
    const updated = await updateEnquiryById(id, req.body);

    if (!updated) return res.status(404).json({ error: "Enquiry not found" });
    sendingUpdatePackageToAdmin(updated);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update enquiry" });
  }
}
