import mongoose from "mongoose";


export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on("connected", ()=>{
            console.log("db connected");
            
        })

        connection.on("error", (error)=>{
            console.log("db connection error");
            process.exit()
        })


        
    } catch (error) {
        console.log("db connection error");
        throw new Error("Error");
        
        
    }
}