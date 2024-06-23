import mongoose from 'mongoose';
const articlesModel = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
        unique: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    imageUrl: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});
export default mongoose.model('article', articlesModel);
