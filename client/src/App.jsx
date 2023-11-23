import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./comonents/Navbar";
import Footer from "./comonents/Footer";
import Home from "./comonents/Home";
import Uploader from "./comonents/Uploader";



const Layout = () => {
    return (
      <>
           <Navbar/>
            <Outlet/>
           <Footer/>
      </>
    )
}



const App = () => {

   
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/upload",
        element:<Uploader/>
      }
    ]
  }
])




  return (
    <RouterProvider router={router} />
  )
}

export default App