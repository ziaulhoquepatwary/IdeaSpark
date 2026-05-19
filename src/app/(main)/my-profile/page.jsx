"use client";
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { User, Mail, Edit2, ArrowLeft, Camera, Loader2, Save, ShieldCheck, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Loading from '@/app/loading';

function MyProfile() {
    const { data: session, isPending } = authClient.useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const user = session?.user;

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || "",
            image: user?.image || ""
        }
    });

    if (isPending) {
        return <Loading />;
    }

    const handleUpdateProfile = async (data) => {
        setIsUpdating(true)

        const { error } = await authClient.updateUser({
            image: data.image,
            name: data.name,
        });

        setIsUpdating(false);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                customClass: {
                    popup: 'rounded-3xl dark:bg-[#111111] dark:text-white border dark:border-gray-800'
                }
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Profile Updated!",
                text: "Your profile has been updated successfully.",
                customClass: {
                    popup: 'rounded-3xl dark:bg-[#111111] dark:text-white border dark:border-gray-800'
                }
            });
            setIsEditing(false);
        }
    };

    const handleEditProfile = () => {
        reset({ name: user?.name || "", image: user?.image || "" });
        setIsEditing(true);
    }

    return (
        <section className="bg-white dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background Glows */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500 rounded-full filter blur-[150px]" />
            </div>

            <div className="max-w-3xl mx-auto space-y-6 relative z-10">

                {/* Header Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2.5 bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-gray-900 rounded-xl hover:text-emerald-600 dark:hover:text-emerald-400 transition-all group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black font-heading tracking-tight text-gray-950 dark:text-white">Account Pipeline</h1>
                            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">User Identity</p>
                        </div>
                    </div>

                    {/* Edit Profile Dynamic Header Button */}
                    {!isEditing && (
                        <button
                            onClick={handleEditProfile}
                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-semibold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/10 transition-all cursor-pointer"
                        >
                            <Edit2 size={14} /> Edit Profile
                        </button>
                    )}
                </div>

                {/* Main Profile Card Base */}
                <div className="bg-gray-50/60 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 rounded-3xl backdrop-blur-xl shadow-xl overflow-hidden">

                    {/* Premium Tech Banner Cover */}
                    <div className="relative h-36 bg-gradient-to-br from-emerald-600 via-emerald-500 to-orange-400 bg-[length:200%_200%] animate-[gradient_6s_ease_infinite] overflow-hidden">
                        {/* dot grid texture */}
                        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:14px_14px] animate-[pulse_3s_ease-in-out_infinite]" />

                        {/* shine sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />

                        {/* badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/20 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-lg hover:scale-105 transition-transform duration-300">
                            <Sparkles size={9} className="animate-spin [animation-duration:4s]" /> IdeaSpark Engine
                        </div>
                    </div>


                    {/* Profile Meta Frame */}
                    <div className="px-6 pb-8 sm:px-8">

                        {/* Avatar Overlay Structure */}
                        <div className="relative -top-14 flex flex-col sm:flex-row items-start sm:items-end gap-5 mb-[-36px]">
                            <div className="relative group rounded-2xl overflow-hidden border-4 border-white dark:border-[#111111] shadow-xl bg-white dark:bg-zinc-900 shrink-0">
                                <img
                                    src={user?.image || "/user.png"}
                                    alt="Profile Identity"
                                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover"
                                />
                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white pointer-events-none animate-fade-in">
                                        <Camera size={20} className="animate-pulse" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1 pb-2">
                                <h2 className="text-2xl font-black tracking-tight text-gray-950 dark:text-white font-heading">
                                    {user?.name}
                                </h2>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                    <Mail size={14} className="text-emerald-500" /> {user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Conditional Rendering (Form Mode vs Read-Only View Mode) */}
                        {isEditing ? (
                            <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-5 pt-4 border-t border-gray-100 dark:border-gray-900/60 animate-in fade-in zoom-in-95 duration-200">
                                <div className="grid grid-cols-1 gap-5">

                                    {/* 1. Name Input Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Full Name</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                                <User size={16} />
                                            </span>
                                            <input
                                                {...register("name", { required: "Name is required" })}
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white
                                                        ${errors.name
                                                        ? "border-red-500 focus:ring-red-500/10"
                                                        : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"
                                                    }`}
                                                placeholder="Enter your profile name"
                                            />
                                        </div>
                                        {errors.name && <p className="text-red-500 text-xs font-medium pl-1">{errors.name.message}</p>}
                                    </div>

                                    {/* 2. Image URL Input Field */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Profile Image URL</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                                <Camera size={16} />
                                            </span>
                                            <input
                                                {...register("image")}
                                                type="text"
                                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                                placeholder="Paste absolute hotlink image URL"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons inside Form */}
                                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-900/40">
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md disabled:opacity-70 transition-all cursor-pointer"
                                    >
                                        {isUpdating ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                                        {isUpdating ? "Processing..." : "Save Changes"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 bg-gray-200/60 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-gray-600 dark:text-gray-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                                    >
                                        <X size={14} /> Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* View/Read-Only Mode Grid */
                            <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-900/60 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* Name Detail Block */}
                                    <div className="p-4 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-100 dark:border-gray-900/60 shadow-sm space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">User Name</p>
                                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <User size={16} className="text-emerald-500" />
                                            <span className="font-bold text-sm text-gray-900 dark:text-white">{user?.name}</span>
                                        </div>
                                    </div>

                                    {/* Email Detail Block */}
                                    <div className="p-4 bg-white dark:bg-[#0A0A0A] rounded-2xl border border-gray-100 dark:border-gray-900/60 shadow-sm space-y-1">
                                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Secure Email Address</p>
                                        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                                            <Mail size={16} className="text-orange-500" />
                                            <span className="font-medium text-sm truncate text-gray-900 dark:text-white">{user?.email}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* Fixed Footer Module: Better-Auth Security Guard Notice */}
                        <div className="mt-6 p-5 bg-emerald-500/5 dark:bg-emerald-500/[0.02] rounded-2xl border border-emerald-500/10 dark:border-emerald-950/40 flex items-start gap-3.5">
                            <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
                                <ShieldCheck size={18} />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-xs font-bold text-gray-950 dark:text-emerald-400 uppercase tracking-wider">Account Infrastructure</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Your core parameters are cryptographic-shielded via **Better Auth Framework**. Node parameters and metadata modifications sync securely to the central data schema.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

export default MyProfile;