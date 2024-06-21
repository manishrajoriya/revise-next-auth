import mongoose from 'mongoose'

const userSchema  = new mongoose.Schema({
    fullName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        tolowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        
        default: false
    },
    
    isAdmin: {
        type: Boolean,
        
        default: false
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
}, {
    timestamps: true
})


const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User