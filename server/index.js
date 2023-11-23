import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import morgan from "morgan"
import prisma from "./config/prismadb.js"
import multer from "multer"
import cors from "cors"
import dataRoute from "./routes/getData.js"

dotenv.config()

const PORT = process.env.PORT || 8000



const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))


app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
     destination:function(req,file,cb){
           cb(null, './uploads')
     },
     filename:function(req,file,cb){
            cb(null, `${Date.now()}-${file.originalname}`)
     }
})



const upload = multer({ storage})


app.use('/api/auth/upload',upload.array('image',4),async(req, res)=>{
         
    console.log(req.body, req.file);
       try {
        const { title, desc } = req.body;
        const imageBuffer = req.files ? req.files.map(file => file.path) : [];
       
        console.log('Received Data:', { title, desc, imageBuffer });



        if (!title || !desc) {
            return res.status(400).json({ error: "Title is required" });
        }

    
        const user = await prisma.user.create({
            data:{
                title,
                desc,
                imageUrl:imageBuffer
            }
        })
    
        return res.status(201).send(user)
       } catch (error) {
           console.log(error);
           return res.status(500).send(error)
       }
})


app.use('/api/auth/data',dataRoute)





app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})