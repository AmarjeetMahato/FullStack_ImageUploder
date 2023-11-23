import { Link } from "react-router-dom"
import { IoLogoCodepen } from "react-icons/io";


const Navbar = () => {
  return (
    <div className="flex fixed top-0 w-full z-10 items-center justify-between py-4 bg-slate-950 text-white px-20">
        <Link to={"/"}>
             <IoLogoCodepen size={50} className="text-white "/>
        </Link>

        <div className="flex text-2xl items-center justify-between gap-10">
                <Link to={"/"}>Home</Link>
                <Link to={"/upload"}>Upload</Link>
        </div>
          
    </div>
  )
}

export default Navbar