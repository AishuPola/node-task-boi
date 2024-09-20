import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendBookingConfirmation(email, name) {
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
      from: `"Proclink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Booking Confirmation is Successful!",
      text: `Hi ${name},\n\nThank you for reaching out to us! 🎉\nWe're excited to confirm that your booking has been successfully received.\n\nOur team will be in touch shortly to provide further assistance. If you have any questions or need help, feel free to contact us at support@yourdomain.com. We're here for you!\n\nLooking forward to helping you,\nThe Proclink Team`,
      html: `
          <p>Hi <b>${name}</b>,</p>
          <p>Thank you for reaching out to us! 🎉<br>
          We're excited to confirm that your booking has been successfully received.</p>
          <p>Our team will be in touch shortly to provide further assistance. If you have any questions or need help, feel free to contact us at <a href="mailto:support@yourdomain.com">paishwarya2003@gmail.com</a>. We're here for you!</p>
          <p>Looking forward to helping you,<br>
          <b>The Proclink Team</b></p>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendPackageSelectionConfirmation(
  email,
  packageName,
  name
) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      //   host: "smtp.office365.com",
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
      text: `Hi ${name} , You have successfully chosen the ${packageName} package.`,
      html: ` <p>Hi <b>${name}</b>,</p>
      <b>You have successfully chosen the ${packageName} package.</b>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Package selection email sent successfully");
  } catch (error) {
    console.error("Error sending package selection email:", error);
  }
}
