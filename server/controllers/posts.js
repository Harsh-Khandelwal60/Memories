import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";



export const getPosts = async(req,res,next) => {

      const {page} = req.query;
        try{

         const LIMIT = 9 ;
         const startInex = (Number(page) -1)*LIMIT; //get the starting index of every page
         const total = await postMessage.find().countDocuments({});

            const posts = await postMessage.find().sort({_id : -1}).limit(LIMIT).skip(startInex);  

            res.status(200).json({data : posts , currentPage : Number(page) , numberOfPages : Math.ceil(total/LIMIT)});

        }catch(err) {
            res.status(404).json({message:err.message});
        }
}


export const getPostsBySearch = async (req, res) => {
   console.log(req.query);

   const {searchQuery , tags} = req.query;

   try {

      const title = new RegExp(searchQuery, 'i');
      
      const posts = await postMessage.find({ $or: [ { title: title }, { tags: {$in: tags.split( ',' ) }  } ] } );

      console.log(posts);

      res.json({data: posts});
   } catch (error) {
      res.status(404).json({message:error.message});
   }

}

export const getPost = async (req, res) => { 
   const { id } = req.params;
   console.log(id);

   try {
       const post = await postMessage.findById(id);
       console.log(post);
       res.status(200).json(post);
   } catch (error) {
       res.status(404).json({ message: error.message });
   }
}


export const createPost = async (req,res) => {

    const post = req.body;
    console.log(req.body);

    const newPost = new postMessage({...post , creator: req.userId, createdAt: new Date().toISOString()});
    
    try{
       await newPost.save();
       res.status(200).json(newPost);
    } catch(err){
        res.status(404).json({message:err.message});
    }
}

export const updatePost = async (req,res) => {
    const { id : _id }= req.params;
    const post = req.body;


    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send('NoPost Is availabe with this ID');

    const updatedPost = await postMessage.findByIdAndUpdate(_id,{...post , _id},{ new:true });

    res.json(updatedPost);
 }

 export const deletePost = async (req,res) => {
    const { id }= req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send('NoPost Is availabe with this ID');

    await postMessage.findByIdAndRemove(id);
    res.json({message : `Post deleted Successfully`});
 }


 export const likePost = async (req,res) => {
    const {id} = req.params;
    
    if(!req.userId) return res.json({message : 'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No Post with that id`);
    const post = await postMessage.findById(id);
     const index = post.likes.findIndex((id) => id === String(req.userId));

     if(index === -1) {
        post.likes.push(req.userId);
     }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
     }
   
    const updatedPost = await postMessage.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);
 }

 export const commentPost = async (req,res) => {
      const {id} = req.params;
      const {value} = req.body;

      const post = await postMessage.findById(id);

      post.comments.push(value);
      const updatedPost = await postMessage.findByIdAndUpdate(id,post,{new:true});

      res.json(updatedPost);
 }
