"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const onSubmit = (data) => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            router.push("/login");
        }, 2000);
        reset();
    };

    useEffect(() => {
        const original = document.body.style.background;
        document.body.style.background = 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7)), url("/images/bricks/register.jpg") center/cover no-repeat fixed';
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
                    <h1 className="text-center font-extrabold text-3xl text-gray-800 tracking-wide drop-shadow">Register Here</h1>
                    <hr className="w-1/2 mx-auto border-gray-300" />
                    {success && (
                        <div className="text-center text-green-600 font-semibold mt-2 animate-fade-in">
                            Registration successful! Redirecting to login...
                        </div>
                    )}
                </section>
                {/* ...inputs and errors as before... */}
                <input
                    type="text"
                    className="focus:outline-none border border-gray-400 focus:border-blue-400 rounded px-3 p-2 transition-all duration-300 shadow-sm"
                    {...register("username", {
                        required: 'Name is required',
                        minLength: { value: 5, message: 'Minimum 5 characters' },
                        maxLength: { value: 100, message: 'Maximum 100 characters' },
                    })}
                    placeholder="Enter Name"
                />
                {errors.username && <span className="text-red-600 text-sm">{errors.username.message}</span>}
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
                <input
                    type="text"
                    className="focus:outline-none border border-gray-400 focus:border-blue-400 rounded px-3 p-2 transition-all duration-300 shadow-sm"
                    {...register("cnic", {
                        required: 'CNIC is required',
                        pattern: {
                            value: /^\d{5}-\d{7}-\d{1}$/,
                            message: 'Invalid CNIC format'
                        }
                    })}
                    placeholder="Enter CNIC (XXXXX-XXXXXXX-X)"
                />
                {errors.cnic && <span className="text-red-600 text-sm">{errors.cnic.message}</span>}
                <input
                    type="file"
                    className="focus:outline-none border border-gray-400 focus:border-blue-400 rounded px-3 p-2 transition-all duration-300 shadow-sm bg-white"
                    {...register("photo", {
                        required: 'Photo is required',
                    })}
                />
                {errors.photo && <span className="text-red-600 text-sm">{errors.photo.message}</span>}
                <select
                    className="focus:outline-none border border-gray-400 focus:border-blue-400 rounded px-3 p-2 transition-all duration-300 shadow-sm bg-white"
                    {...register("role", {
                        required: 'Role is required',
                    })}
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">Munshi</option>
                    <option value="user">Worker</option>
                    <option value="user">Buyer</option>
                </select>
                {errors.role && <span className="text-red-600 text-sm">{errors.role.message}</span>}
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="border p-2 px-4 rounded-lg cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow hover:scale-105 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300"
                    >
                        Register
                    </button>
                </div>
            </form>
        </section>
    );
    }