"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lightbulb, FileText, AlignLeft, Layers, Hash, Image as ImageIcon, Wallet, Users, Target, ShieldAlert, Plus, Loader2 } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

function AddIdea() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmitForm = async (data) => {
        setIsSubmitting(true);

        try {
            // Create clean payload
            const formattedData = {
                ...data,

                tags:
                    typeof data.tags === "string"
                        ? data.tags
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter(Boolean)
                        : data.tags,
            };

            const API = axios.create({
                baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
                withCredentials: true,
            });

            const res = await API.post("/api/ideas", formattedData);

            await Swal.fire({
                icon: "success",
                title: "Idea Published 🚀",
                text: res.data?.message || "Your idea was submitted successfully.",
                background: "#0A0A0A",
                color: "#ffffff",
                confirmButtonColor: "#10b981",
                timer: 2200,
                showConfirmButton: false,
            });

            reset();

        } catch (error) {

            const message =
                error?.response?.data?.message ||
                "Something went wrong!";

            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: message,
                background: "#0A0A0A",
                color: "#ffffff",
                confirmButtonColor: "#ef4444",
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    const categories = ["Tech", "Health", "AI", "Education", "Finance", "Environment", "Other"];

    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background Decorative Glow */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-emerald-500 rounded-full filter blur-[130px]" />
                <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-orange-400 rounded-full filter blur-[130px]" />
            </div>

            <div className="max-w-4xl mx-auto space-y-8 relative z-10">

                {/* 1. Form Header */}
                <div className="text-center md:text-left space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/20">
                        <Plus className="w-3.5 h-3.5" /> Pipeline Factory
                    </div>
                    <h1 className="text-3xl font-black font-heading tracking-tight text-gray-950 dark:text-white sm:text-4xl">
                        Launch a New <span className="text-emerald-600 dark:text-emerald-500">Innovation Blueprint</span>
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Fill out the technical framework parameters below. Required core modules will be validated instantly before compilation.
                    </p>
                </div>

                {/* 2. Premium Grid Form Container */}
                <form onSubmit={handleSubmit(onSubmitForm)} className="bg-gray-50/50 dark:bg-[#111111]/30 border border-gray-100 dark:border-gray-900/60 p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-xl space-y-8">

                    {/* SECTION A: Primary Information */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-900 pb-2">
                            01. Core Identity
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Idea Title */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Idea Title *</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <Lightbulb size={16} />
                                    </span>
                                    <input
                                        {...register("title", { required: "Idea title is required" })}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.title ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                        placeholder="e.g., MediConnect: AI Rural Diagnostics"
                                    />
                                </div>
                                {errors.title && <p className="text-red-500 text-xs font-medium pl-1">{errors.title.message}</p>}
                            </div>

                            {/* Short Description */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Short Description *</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <FileText size={16} />
                                    </span>
                                    <input
                                        {...register("shortDescription", { required: "Short description is required" })}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.shortDescription ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                        placeholder="A brief catchy one-liner of your startup concept..."
                                    />
                                </div>
                                {errors.shortDescription && <p className="text-red-500 text-xs font-medium pl-1">{errors.shortDescription.message}</p>}
                            </div>

                            {/* Detailed Description */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Detailed Description *</label>
                                <div className="relative">
                                    <span className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                                        <AlignLeft size={16} />
                                    </span>
                                    <textarea
                                        {...register("detailedDescription", { required: "Detailed description is required" })}
                                        rows="4"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 resize-none
                                            ${errors.detailedDescription ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                        placeholder="Explain the full architectural scope, framework mechanics, and target vision..."
                                    />
                                </div>
                                {errors.detailedDescription && <p className="text-red-500 text-xs font-medium pl-1">{errors.detailedDescription.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION B: Classification & Assets */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-900 pb-2">
                            02. Metadata & Parameters
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category Dropdown */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Category *</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <Layers size={16} />
                                    </span>
                                    <select
                                        {...register("category", { required: "Please select a category" })}
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white cursor-pointer appearance-none
                                            ${errors.category ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat} className="bg-white dark:bg-[#111111]">{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.category && <p className="text-red-500 text-xs font-medium pl-1">{errors.category.message}</p>}
                            </div>

                            {/* Tags Input (Optional) */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Tags <span className="text-[10px] text-gray-400 dark:text-gray-600 lowercase">(optional)</span></label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <Hash size={16} />
                                    </span>
                                    <input
                                        {...register("tags")}
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                        placeholder="Comma-separated (e.g., AI, SaaS, Web3)"
                                    />
                                </div>
                            </div>

                            {/* Image URL */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Image URL *</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <ImageIcon size={16} />
                                    </span>
                                    <input
                                        {...register("imageURL", { required: "Image link is required" })}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.imageURL ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                        placeholder="Paste image absolute hotlink path..."
                                    />
                                </div>
                                {errors.imageURL && <p className="text-red-500 text-xs font-medium pl-1">{errors.imageURL.message}</p>}
                            </div>

                            {/* Estimated Budget (Optional) */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Estimated Budget <span className="text-[10px] text-gray-400 dark:text-gray-600 lowercase">(optional)</span></label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <Wallet size={16} />
                                    </span>
                                    <input
                                        {...register("estimatedBudget")}
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400"
                                        placeholder="e.g., $15,000"
                                    />
                                </div>
                            </div>

                            {/* Target Audience */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Target Audience *</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <Users size={16} />
                                    </span>
                                    <input
                                        {...register("targetAudience", { required: "Target audience group is required" })}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.targetAudience ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                        placeholder="e.g., Rural Patients, E-commerce Logistics, Tech Founders"
                                    />
                                </div>
                                {errors.targetAudience && <p className="text-red-500 text-xs font-medium pl-1">{errors.targetAudience.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION C: Advanced Case Breakdown */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-900 pb-2">
                            03. Feasibility Study (Deep Dive)
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Problem Statement */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Problem Statement *</label>
                                <div className="relative">
                                    <span className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                                        <Target size={16} />
                                    </span>
                                    <textarea
                                        {...register("problemStatement", { required: "Problem statement validation is required" })}
                                        rows="3"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 resize-none
                                            ${errors.problemStatement ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                        placeholder="What critical market crisis or painful problemStatement does this idea resolve?"
                                    />
                                </div>
                                {errors.problemStatement && <p className="text-red-500 text-xs font-medium pl-1">{errors.problemStatement.message}</p>}
                            </div>

                            {/* Proposed dSolution */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Proposed Solution *</label>
                                <div className="relative">
                                    <span className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                                        <Lightbulb size={16} />
                                    </span>
                                    <textarea
                                        {...register("proposedSolution", { required: "Proposed Solution details are required" })}
                                        rows="3"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 resize-none
                                            ${errors.proposedSolution ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:ring-emerald-500/10"}`}
                                        placeholder="How does your architecture feature mitigate the above-mentioned problemStatement statement?"
                                    />
                                </div>
                                {errors.proposedSolution && <p className="text-red-500 text-xs font-medium pl-1">{errors.proposedSolution.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Central Error Summary Notice */}
                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 bg-red-500/5 dark:bg-red-500/[0.02] rounded-2xl border border-red-500/15 text-red-500 text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200">
                            <ShieldAlert size={16} className="shrink-0" />
                            <span>Some fields contain invalid inputs or are missing. Please re-check validation.</span>
                        </div>
                    )}

                    {/* Submit Action Block */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-900/40">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/10 disabled:opacity-70 transition-all cursor-pointer"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                            {isSubmitting ? "Compiling Core..." : "Submit Innovation Pipeline"}
                        </button>
                    </div>

                </form>

            </div>
        </section>
    );
}

export default AddIdea;