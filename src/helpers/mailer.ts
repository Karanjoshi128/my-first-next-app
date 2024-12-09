import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import 'dotenv/config'

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    //create a hashed token

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }
    
    //create a transporter

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_NAME_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER,
      },
    });


    const mailOptions = {
        from : "joshikaran.aad.0007@gmail.com",
        to :  email,
        subject : emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy the url and paste in the browser - ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`

    }

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
}


// else if (emailType === "FORGOT_PASSWORD") {
//   await User.findOneAndUpdate({ email }, {
//     forgotPasswordToken: hashedToken,
//     forgotPasswordTokenExpiry: Date.now() + 360000,
//   })
// }