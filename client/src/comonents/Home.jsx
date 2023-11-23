import { useEffect, useState } from "react"
import { PiMaskSad } from "react-icons/pi";


const Home = () => {
   const [data, setData] = useState(null)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/data`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[])
 
  return (
    <div>
      {data && data.length > 0 ? (
        <div className="flex items-center justify-center  flex-wrap m-10">
          {data.map((item) => (
            <div key={item.id} className="max-w-[350px] mx-10 w-full h-[400px] shadow-lg my-10 px-2">
              <p className="text-[20px] font-semibold"> {item.title}</p>
              <p className="text-[14px] py-2">{item.desc.substring(0, 60)}...</p>
              {item.imageUrl.length > 0 && (
              <img className="w-full h-[300px] object-cover" src={`http://localhost:5000/${item.imageUrl[1]}`} alt={`Image ${item.imageUrl[0]}`} />
            )}

              {/* Add more rendering based on your data structure */}
            </div>
          ))}
        </div>
      ):(
          <div className="flex items-center justify-center h-screen mx-auto">
               <p className="text-[20px] text-gray-600 flex items-center gap-3"><PiMaskSad size={40} />No Post Found</p>
          </div>
      )}
    </div>
  )
}

export default Home