import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    zipCode: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export default User