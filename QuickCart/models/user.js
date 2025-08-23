import mongoose, { Schema } from "mongoose";
// import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    _id: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    cartItoms: { type: Object, default: {} }

}, { minimize: false })

const User = mongoose.model.user || mongoose.model('user', userSchema)
export default User