import express from "express"
import prisma from "../config/prismadb.js"


const router = express.Router()


router.get('/',async(req,res)=>{
    try {
           const getData = await prisma.user.findMany({
            select: {
                id: true,
                title: true,
                desc: true,
                imageUrl:true
                // Include other fields you need
            },
           })
           console.log(getData);
           return res.status(200).json(getData)

    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})




export default router