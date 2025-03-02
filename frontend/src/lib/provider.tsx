"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store/index";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

export default function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const unprotectedRoutes = ["/auth/login", "/auth/register"];

    return (
        <Provider store={store}>
            {unprotectedRoutes.includes(pathname) ? children : <AuthGuard>{children}</AuthGuard>}
        </Provider>
    );
}
