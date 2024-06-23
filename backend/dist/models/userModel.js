import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const User = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passwordHash: {
        type: String,
        require: true,
    },
    avatar: String
}, { timestamps: true });
export default mongoose.model("User", User);
