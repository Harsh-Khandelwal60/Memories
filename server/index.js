import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js'

import dotenv from 'dotenv';


dotenv.config();


const app = express();


app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use('/posts',postRoutes);
//



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL)
.then(() => app.listen(PORT , () => console.log(`server running on port ${PORT}`)))
.catch((err) => console.log(err.message));







