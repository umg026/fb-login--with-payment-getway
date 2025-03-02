import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginHandel } from "./authThunk";

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string }>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;

            sessionStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(LoginHandel.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(LoginHandel.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(LoginHandel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
