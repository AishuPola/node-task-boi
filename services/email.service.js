import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendBookingConfirmation(email) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use port 587 for TLS
      secure: false, // Use false since TLS (not SSL)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Optional, to bypass strict TLS certificate checking
      },
    });

    let mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Booking Confirmation",
      text: "Your booking was successful!",
      html: "<b>Your booking was successful!</b>",
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendPackageSelectionConfirmation(email, packageName) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Package Selection Confirmation",
      text: `You have successfully chosen the ${packageName} package.`,
      html: `<b>You have successfully chosen the ${packageName} package.</b>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Package selection email sent successfully");
  } catch (error) {
    console.error("Error sending package selection email:", error);
  }
}
