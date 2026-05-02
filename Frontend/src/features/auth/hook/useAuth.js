import { setError,setLoading,setUser } from "../state/auth.slice.js";
import {login, register} from "../service/auth.api.js";
import { useDispatch } from "react-redux";

const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister({name, email, password, companyName}){

        const data = await register({name, email, password, companyName})
        
        dispatch(setUser(data.user))
    }

    async function handleLogin({email, password}){

        const data = await login({email, password})

        dispatch(setUser(data.user))
    }

    async function handleVerifyOTP({email, otp}){

        const data = await verifyOTP({email, otp})

        dispatch(setUser(data.user))
    }

    return {handleRegister, handleLogin, handleVerifyOTP}

}

export default useAuth