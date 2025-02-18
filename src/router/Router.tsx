import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "../pages/HomePage"
import SigninPage from "../pages/SigninPage"
import ProfileScreen from "../pages/ProfileScreen"

const  Router = ()=>{

    const router = createBrowserRouter([
        {
            path:'/',
            element:<HomePage/>
        },{
            path:"/signin",
            element:<SigninPage/>
        },{
            path:"/profile",
            element:<ProfileScreen/>
        }
    ])


    return (
      <RouterProvider router={router}/>
    )
}


export default Router