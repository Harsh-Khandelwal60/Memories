import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema({
    title:  String,
    message: String,
    name:String, 
    creator: String,
    tags: [String],
    selectedFile : String,
    likes: {
        type:[String],
        default:[]
    },
    comments : {
        type:[String],
        default:[],
    },
    createdAt: {
        type:Date,
        default: new Date(),
    },

});

const postMessage = mongoose.model('postMessage',mongooseSchema);
export default postMessage;