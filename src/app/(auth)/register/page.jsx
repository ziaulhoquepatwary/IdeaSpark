"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, ArrowRight, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from '@/lib/auth-client';
import Swal from "sweetalert2";


function Register() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const getRedirectUrl = () => {
        const redirect = searchParams.get("redirect") || searchParams.get("callbackUrl");
        return redirect || "/";
    };

    const onSubmit = async (userData) => {
        console.log("Register Form Data:", userData);

        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.imageUrl,
        })

        console.log(data, error);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong during registration. Please try again.",
            });
            reset();
        } else {
            router.push(getRedirectUrl());
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}${getRedirectUrl()}`,
        });
    };


    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative">

            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-gray-700 hover:bg-gray-50 transition-all text-sm font-medium"
            >
                <FaHome className="text-orange-500" />
                <span>Go Home</span>
            </Link>

            {/* Background decorative glows */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full filter blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500 rounded-full filter blur-[120px]" />
            </div>

            <div className="max-w-md w-full space-y-6 bg-gray-50/60 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 p-8 rounded-3xl backdrop-blur-xl shadow-xl relative z-10">

                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-extrabold font-heading tracking-tight text-gray-950 dark:text-white">
                        Create Your <span className="text-emerald-600 dark:text-emerald-500">Account</span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Join IdeaSpark to validate and spark your next big venture.
                    </p>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">

                    {/* 1. Name Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name", { required: "Name is required" })}
                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white
                                    ${errors.name
                                        ? "border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    }`}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-500 font-medium pl-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* 2. Email Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white
                                    ${errors.email
                                        ? "border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 font-medium pl-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* 3. Password Field with Strict Uppercase/Lowercase Validation */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters required" },
                                    validate: {
                                        hasUpper: (value) => /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                                        hasLower: (value) => /[a-z]/.test(value) || "Must contain at least one lowercase letter"
                                    }
                                })}
                                className={`w-full pl-11 pr-12 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white
                                    ${errors.password
                                        ? "border-red-500 focus:ring-red-500/20"
                                        : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/20"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 font-medium pl-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* 4. Image URL Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                            Avatar Image URL <span className="text-gray-400 text-[10px] font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                <ImageIcon size={18} />
                            </span>
                            <input
                                type="url"
                                placeholder="https://example.com/avatar.png"
                                {...register("imageUrl")}
                                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-md shadow-emerald-600/10 group text-sm cursor-pointer"
                    >
                        Register Account
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </form>

                {/* Divider Line */}
                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                    <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider font-semibold">Or connect with</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                </div>

                {/* Google Social Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-zinc-900/60 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer shadow-sm"
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                {/* Navigation To Login Page */}
                <div className="text-center pt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                        >
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </section>
    )
}

export default Register