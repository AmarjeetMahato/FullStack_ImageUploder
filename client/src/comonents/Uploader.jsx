import { useState } from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


const FormSchema = z.object({
    title:z.string().refine(data => data.length > 0 , {message:"Title is required"}),
    desc:z.string().refine(data => data.length > 0 , {message:"Description is required"})
})




const Uploader = () => {
    const [image, setImage] = useState('')
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues:{
            title:"",
            desc:"",
        }
    })


  const onsubmit = async(data) => {
    
       const formData = new FormData()
       formData.append('title', data.title)
       formData.append('desc', data.desc)

       const images = Array.from(image);

       images.forEach((file) => {
        formData.append('image', file);
      });
      
      
  console.log([...formData]); 

        try {
              const res  = await axios.post(`/api/auth/upload`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for handling file uploads
                },
            }) 
              if(res?.status === 201){
                alert('Form Submitted')
                console.log(res.data);
              }
        } catch (error) {
            console.log(error);
        }
      
  }


  const handleChange = (e) => {
    // Ensure that a file is selected before updating the state
    if (e.target.files.length > 0) {
        setImage(e.target.files);
    }
};
         


  return (
    <div className="flex items-center justify-center">

        <form action="" method="POST" encType="multipart/form-data" className="flex flex-col items-center  justify-center h-screen  w-3xl  ">
              
              <div className="flex flex-col w-3xl items-center bg-slate-300 shadow-xl justify-center h-[300px] gap-5">
              <input {...register('title')} type="text" placeholder="Enter title" className="border-b px-5 py-5 border-gray-800"  />
              {errors.title && <p className="text-red-500" >{errors.title.message}</p> }
               <input {...register('desc')} type="text" placeholder="Enter desc"  className="border-b px-5 py-5 border-gray-800" />
               {errors.desc && <p className="text-red-500" >{errors.desc.message}</p> }
               <input {...register('imageUrl')} multiple type="file"  className="px-5" onChange={handleChange}/>
               <button className="w-3xl px-10 bg-green-500 py-2 text-white" onClick={handleSubmit(onsubmit)}>Submit</button>
              </div>
             
        </form>
    </div>
  )
}

export default Uploader