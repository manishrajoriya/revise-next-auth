import User from "@/modles/userModel";
import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import {sendEmail} from "@/helper/mailer"




connect()


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, username, password} = reqBody

        const user = await User.findOne({email})
        if(user) { 
            return NextResponse.json({error:"User already exists"}, {status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
    console.log(hashedPassword);
    
        const newUser = await new User({ email, username, password:hashedPassword})

        const savedUser = await newUser.save()
    console.log(savedUser);
    
        await sendEmail({email, emailType: "VERIFY", userID: savedUser._id})


        return NextResponse.json({message:"User created successfully",
            success: true,
            savedUser
        }, {status:201})



        
        
        
    } catch (error:any) {
        console.log("errore in signup route");
        
        return NextResponse.json({error:error.message},{status:500})
    }
}