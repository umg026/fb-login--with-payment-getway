'use client';
import FaceBookButton from "@/components/FaceBookButton";
import { LoginHandel } from "@/lib/authSlice/authThunk";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            dispatch(LoginHandel(formData) as any);
            router.push('/')
        } catch (error) {
            console.log(error);

        }
    };

    return (
        <div className="container">
            <h2 className="p-2">Login Form</h2>

            <form className="container" onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        required
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">Login</button>
                    <Link className="btn btn-primary" href="/auth/register">Register</Link>
                </div>
            </form>

            <hr />

            <FaceBookButton />
        </div>
    );
}
