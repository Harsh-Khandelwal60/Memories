import postMessage from "../models/postMessage.js";



export const getPosts = async(req,res,next) => {
        try{
            const postMessages = await postMessage.find();


           res.status(200).json(postMessages);

        }catch(err) {
            res.status(404).json({message:err.message});
        }
}

export const createPost = (req,res) => {

    const post = req.body;

    const newPost = new postMessage(post);
    try{
       newPost.save();
       res.status(200).json(newPost);
    } catch(err){
        res.status(404).json({message:err.message});
    }
}
