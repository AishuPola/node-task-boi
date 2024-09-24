import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
//sending mail to user.
export async function sendBookingConfirmation(email, name) {
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
      from: `"Proclink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Booking Confirmation is Successful!",
      text: `Hi ${name},\n\nThank you for reaching out to us! 🎉\nWe're excited to confirm that your booking has been successfully received.\n\nOur team will be in touch shortly to provide further assistance. If you have any questions or need help, feel free to contact us at support@yourdomain.com. We're here for you!\n\nLooking forward to helping you,\nThe Proclink Team`,
      html: `
          <p>Hi <b>${name}</b>,</p>
          <p>Thank you for reaching out to us! 🎉<br>
          We're excited to confirm that your booking has been successfully received.</p>
          <p>Our team will be in touch shortly to provide further assistance. If you have any questions or need help, feel free to contact us at <a href="mailto:support@yourdomain.com">ksrinu.43@gmail.com</a>. We're here for you!</p>
          <p>Looking forward to helping you,<br>
          <b>The Proclink Team</b></p>
        `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to the user");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

//sending mail to admins
export async function sendingUserDetailsToAdmin(details) {
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
      from: `"Proclink" <${process.env.EMAIL_USER}>`,
      to: `aishwarya.pola@proclink.com`,
      subject: `New User Registration Details`,
      text: `Dear Admin,

A new user has registered. Below are the details:

ID: ${details.id}
Full Name: ${details.fullname}
Phone Number: ${details.phone_number}
Registered On: ${details.timestamp}
State: ${details.state}
Email: ${details.email}
Company: ${details.company}

Please review the user's information and follow up if necessary.

Best regards,
Proclink Team
`,
      html: `
<p>Dear Admin,</p>
<p>A new user has registered. Below are the details:</p>
<ul>
  <li><strong>ID:</strong> ${details.id}</li>
  <li><strong>Full Name:</strong> ${details.fullname}</li>
  <li><strong>Phone Number:</strong> ${details.phone_number}</li>
  <li><strong>Registered On:</strong> ${details.timestamp}</li>
  <li><strong>State:</strong> ${details.state}</li>
  <li><strong>Email:</strong> ${details.email}</li>
  <li><strong>Company:</strong> ${details.company}</li>
</ul>
<p>Please review the user's information and follow up if necessary.</p>
<p>Best regards,</p>
<p><strong>Proclink Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("User details email sent successfully to the admin");
  } catch (error) {
    console.error("Error sending user details email:", error);
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
      from: `"Proclink" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation of Package Selection",
      text: `Dear ${name},

We are pleased to inform you that you have successfully selected the ${packageName} package.

Thank you for choosing our services. If you have any questions or need further assistance, feel free to contact us.

Best regards,
Proclink Team
`,
      html: `
<p>Dear <strong>${name}</strong>,</p>
<p>We are pleased to inform you that you have successfully selected the <strong>${packageName}</strong> package.</p>
<p>Thank you for choosing our services. If you have any questions or need further assistance, feel free to contact us.</p>
<p>Best regards,</p>
<p><strong>Proclink Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Package selection email sent successfully");
  } catch (error) {
    console.error("Error sending package selection email:", error);
  }
}

export async function sendingUpdatePackageToAdmin(details) {
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
      from: `"Proclink" <${process.env.EMAIL_USER}>`,
      to: `aishwarya.pola@proclink.com`,
      subject: `Updated User Details and Selected Package`,
      text: ` 
Dear Admin,

The user ${details.fullname} has selected the following package: ${details.package}.

Please find the updated details of the user below:

- ID: ${details.id}
- Full Name: ${details.fullname}
- Phone Number: ${details.phone_number}
- Registration Date: ${details.timestamp}
- State: ${details.state}
- Email: ${details.email}
- Company: ${details.company}

Best regards,
Proclink Team
`,
      html: `
<h3>Updated User Details</h3>
<p>Dear Admin,</p>
<p>The user <strong>${details.fullname}</strong> has selected the following package: <strong>${details.package}</strong>.</p>
<p>Please find the updated details of the user below:</p>
<ul>
  <li><strong>ID:</strong> ${details.id}</li>
  <li><strong>Full Name:</strong> ${details.fullname}</li>
  <li><strong>Phone Number:</strong> ${details.phone_number}</li>
  <li><strong>Registration Date:</strong> ${details.timestamp}</li>
  <li><strong>State:</strong> ${details.state}</li>
  <li><strong>Email:</strong> ${details.email}</li>
  <li><strong>Company:</strong> ${details.company}</li>
</ul>
<p>Best regards,</p>
<p><strong>Proclink Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to the admin");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
