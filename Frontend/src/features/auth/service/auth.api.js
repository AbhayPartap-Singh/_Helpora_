import axios from "axios"

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
})

export async function register({name, email, password, companyName}){

    const response = await authApiInstance.post("/register",{
        name,
        email,
        password,
        companyName
    })

    return response.data
}

export async function login({email, password}){

    const response = await authApiInstance.post("/login",{
        email,
        password,
    })

    return response.data
}

export async function verifyOTP({email, otp}){

    const response = await authApiInstance.post("/verify-otp",{
        email,
        otp,
    })

    return response.data
}

