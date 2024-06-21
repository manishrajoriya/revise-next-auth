import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/modles/userModel"

export async function sendEmail({email, emailType, userID}:any){
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 10)
        console.log(hashedToken);
        
        if (emailType === "VERIFY") {
           await User.findByIdAndUpdate(userID, {verifyToken: hashedToken, verifyTokenExpiry: Date.now()+ 3600000}) 
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userID, {forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now()+ 3600000})
        }

         var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "5f84c4561b32c5",
        pass: "5fbfa383cd4866"
        }
        });

        const mailOption = {
            from: "gkrajoriya3@gmail.com", // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY"? "verify your email ": "reset your password", // Subject line
            text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

       const mailResponce = await transport.sendMail(mailOption)

       return mailResponce


        
    } catch (error:any) {
        console.log("errore in nodemailer");
        
        throw new Error(error.message)
    }
}