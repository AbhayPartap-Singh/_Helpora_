import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import VerifyOTP from "../features/auth/pages/VerifyOTP";

const router = createBrowserRouter([
    {
        path:"/",
        element:<h1>Home</h1>
    },

    {
        path:"/login",
        element:<Login />
    },

    {
        path:"/register",
        element:<Register/>
    },

    {
        path:"/verify-otp",
        element:<VerifyOTP />
    }
])

export default router