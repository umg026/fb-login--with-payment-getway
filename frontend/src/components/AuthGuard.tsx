"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootState } from "@/lib/store/index";
import { setAuth } from "@/lib/authSlice";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token && !isAuthenticated) {
            dispatch(setAuth({ token }));
        }

        if (!isAuthenticated && !token && pathname !== "/auth/login") {
            router.replace("/auth/login");
            sessionStorage.clear();
        }
    }, [isAuthenticated, pathname, router, dispatch]);

    return isAuthenticated && user ? <>{children}</> : null;
};

export default AuthGuard;
