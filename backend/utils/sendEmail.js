import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    // ✅ Configure transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your App Password
      },
    });

    const mailOptions = {
      from: `"Creator Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};
