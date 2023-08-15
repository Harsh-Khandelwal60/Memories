import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema({
    title:  String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile : String,
    likeCount: {
        type:String,
        default:0
    },
    createdAt: {
        type:Date,
        default: new Date(),
    },

});

const postMessage = mongoose.model('postMessage',mongooseSchema);
export default postMessage;