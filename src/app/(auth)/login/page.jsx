"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const router = useRouter();

    const onSubmit = (data) => {
        // Simulate successful login
        setLoginSuccess(true);
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
            setLoginSuccess(false);
            router.push("/");
        }, 2000);
        reset();
    };

    useEffect(() => {
        const original = document.body.style.background;
        document.body.style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7)), url("/images/bricks/login.jpg") center/cover no-repeat fixed';
        document.body.style.minHeight = "100vh";
        document.body.style.fontFamily = "Poppins, Arial, sans-serif";
        return () => {
            document.body.style.background = original;
            document.body.style.minHeight = "";
            document.body.style.fontFamily = "";
        };
    }, []);

    return (
        <section className="min-h-screen w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md flex flex-col gap-4 border border-gray-200 shadow-2xl rounded-2xl animate-fade-in"
                style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
            >
                <section className="flex flex-col gap-2 mb-2">
                    <h1 className="text-center font-extrabold text-3xl text-gray-800 tracking-wide drop-shadow">Login</h1>
                    <hr className="w-1/2 mx-auto border-gray-300" />
                    {loginSuccess && (
                        <div className="text-center text-green-600 font-semibold mt-2 animate-fade-in">
                            Login successful! Redirecting to homepage...
                        </div>
                    )}
                </section>
                <input
                    type="email"
                    className="focus:outline-none border border-gray-400 focus:border-blue-400 rounded px-3 p-2 transition-all duration-300 shadow-sm"
                    {...register("email", {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address'
                        }
                    })}
                    placeholder="Enter Email"
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                <input
                    type="password"
                    className="focus:outline-none border border-gray-400 focus:border-blue-400 rounded px-3 p-2 transition-all duration-300 shadow-sm"
                    {...register("password", {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                    placeholder="Enter Password"
                />
                {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="border p-2 px-4 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow hover:scale-105 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300"
                        disabled={loginSuccess}
                    >
                        Login
                    </button>
                </div>
                <div className="text-center mt-2">
                    <span className="text-gray-700">Not registered? </span>
                    <Link href="/register" className="text-blue-600 hover:underline font-semibold">
                        Register here
                    </Link>
                </div>
            </form>
        </section>
    );
}