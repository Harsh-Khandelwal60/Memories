import  express from "express";
const router = express.Router();
import { signin , signup } from "../controllers/user.js";


router.post('/signin', signin)
router.post('/signun', signup)


export default router;