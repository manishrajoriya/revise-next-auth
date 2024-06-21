import {connect } from "@/dbConfig/dbConfig"
import {NextRequest, NextResponse} from "next/server"
import User from "@/modles/userModel"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"



connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({message:"User not found"}, {status:404})
        }

        const veriryedUser = bcryptjs.compare(password, user.password)

        if (!veriryedUser) {
            throw new Error("Invalid credentials")
        }
       


        const token = jwt.sign({id:user._id, email: user.email}, process.env.TOKEN_SECRET as string, {expiresIn: "1d"})

         const responce = NextResponse.json({
            message:"User logged in successfully",
            success: true,
        
        })

        responce.cookies.set({
            name:"token",
            value:token,
            httpOnly:true
        })

        return responce



        
    } catch (error:any) {
        console.log("error in login");
        throw new Error(error.message)
        
    }
}