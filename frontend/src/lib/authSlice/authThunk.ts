import { BASE_URL } from "@/constants/Code";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginPayload {
    email: string;
    password: string;
}

interface User {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;

}

export const LoginHandel = createAsyncThunk<User, LoginPayload>('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/login`, userData)
        console.log("data", res.data);

        const {token,user} = res.data
        sessionStorage.setItem("uid", token);

        return { user, token };


    } catch (error:any) {
        console.log("error", error);
        const errMsg = error.response?.data.error
        alert(errMsg)
        return rejectWithValue(error || "Login failed");
    }
})

// signup thunk :
export const SingUp = createAsyncThunk<User, LoginPayload>('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/auth/signup`, userData)
        console.log("error", res.data);
        return res.data;

    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error || "Login failed");
    }
})
