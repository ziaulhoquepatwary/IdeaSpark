"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Lightbulb, FileText, AlignLeft, Layers, Hash, Image as ImageIcon, Wallet, Users, Target, ShieldAlert, Loader2, ArrowLeft, RefreshCw } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";

const categories = ["Tech", "Health", "AI", "Education", "Finance", "Environment", "Other"];

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
});

export default function EditIdeaPage() {
    const params = useParams();
    const id = params?.id;
    const router = useRouter();

    const [ideaData, setIdeaData] = useState(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (!id) return;

        const getExistingIdea = async () => {
            try {
                const res = await API.get(`/api/ideas/${id}`);

                if (res.data && res.data.success) {
                    const formattedIdea = {
                        ...res.data.idea,
                        tags: res.data.idea.tags?.join(", ") || "",
                    };

                    setIdeaData(formattedIdea);

                    reset(formattedIdea);
                }
            } catch (err) {
                console.error("Error fetching idea with axios:", err);
                Swal.fire({
                    title: "Error!",
                    text: err.response?.data?.message || "Could not fetch the idea data.",
                    icon: "error",
                    confirmButtonColor: "#ef4444",
                });
            }
        };

        getExistingIdea();
    }, [id, reset]);

    const onUpdateForm = async (formData) => {
        try {
            const formattedData = {
                ...formData,
                tags: typeof formData.tags === "string"
                    ? formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
                    : formData.tags
            };

            const res = await API.patch(`/api/ideas/${id}`, formattedData);

            if (res.data && res.data.success) {
                await Swal.fire({
                    title: "Updated!",
                    text: "Innovation node updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                    background: "#111111",
                    color: "#ffffff",
                });

                router.push("/my-ideas");
            } else {
                Swal.fire({
                    title: "Failed!",
                    text: res.data?.message || "Update failed.",
                    icon: "error",
                    confirmButtonColor: "#ef4444",
                });
            }

        } catch (error) {
            console.error("Update failed with axios:", error);
            const errorMessage = error.response?.data?.message || "Something went wrong.";

            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-12 px-4 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background Decorative Glow */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-orange-500 rounded-full filter blur-[130px]" />
                <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500 rounded-full filter blur-[130px]" />
            </div>

            <div className="max-w-4xl mx-auto space-y-6 relative z-10">

                {/* Header Block */}
                <div className="space-y-2">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-orange-500 uppercase tracking-wider transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={14} /> Back to Repository
                    </button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-black tracking-tight">Modify <span className="text-orange-500">Innovation Node</span></h1>
                        {!ideaData && <Loader2 className="animate-spin text-orange-500 shrink-0" size={20} />}
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Target Node ID: <span className="text-orange-500">{id}</span></p>
                </div>

                <form onSubmit={handleSubmit(onUpdateForm)} className="bg-gray-50/50 dark:bg-[#111111]/30 border border-gray-100 dark:border-gray-900/60 p-6 sm:p-10 rounded-3xl backdrop-blur-xl shadow-xl space-y-8">

                    {/* SECTION 01: Core Identity */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-orange-500 border-b border-gray-100 dark:border-gray-900 pb-2">
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
                                        key={ideaData?.title || "title-empty"}
                                        defaultValue={ideaData?.title || ""}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.title ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
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
                                        key={ideaData?.shortDescription || "desc-empty"}
                                        defaultValue={ideaData?.shortDescription || ""}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.shortDescription ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
                                        placeholder="A brief catchy one-liner of your concept..."
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
                                        key={ideaData?.detailedDescription || "detailed-empty"}
                                        defaultValue={ideaData?.detailedDescription || ""}
                                        rows={4}
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 resize-none
                                            ${errors.detailedDescription ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
                                        placeholder="Explain the full architectural scope..."
                                    />
                                </div>
                                {errors.detailedDescription && <p className="text-red-500 text-xs font-medium pl-1">{errors.detailedDescription.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 02: Metadata & Parameters */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-orange-500 border-b border-gray-100 dark:border-gray-900 pb-2">
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
                                        key={ideaData?.category || "category-empty"}
                                        defaultValue={ideaData?.category || ""}
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white cursor-pointer appearance-none
                                            ${errors.category ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
                                    >
                                        {categories.map((cat, index) => (
                                            <option key={`${cat}-${index}`} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.category && <p className="text-red-500 text-xs font-medium pl-1">{errors.category.message}</p>}
                            </div>

                            {/* Tags Input */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Tags <span className="text-[10px] text-gray-400 dark:text-gray-600 lowercase">(optional)</span></label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <Hash size={16} />
                                    </span>
                                    <input
                                        {...register("tags")}
                                        key={ideaData?.tags || "tags-empty"}
                                        defaultValue={ideaData?.tags || ""}
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400"
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
                                        key={ideaData?.imageURL || "image-empty"}
                                        defaultValue={ideaData?.imageURL || ""}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.imageURL ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
                                        placeholder="Paste image absolute link path..."
                                    />
                                </div>
                                {errors.imageURL && <p className="text-red-500 text-xs font-medium pl-1">{errors.imageURL.message}</p>}
                            </div>

                            {/* Estimated Budget */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Estimated Budget <span className="text-[10px] text-gray-400 dark:text-gray-600 lowercase">(optional)</span></label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                                        <Wallet size={16} />
                                    </span>
                                    <input
                                        {...register("estimatedBudget")}
                                        key={ideaData?.estimatedBudget || "budget-empty"}
                                        defaultValue={ideaData?.estimatedBudget || ""}
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400"
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
                                        key={ideaData?.targetAudience || "audience-empty"}
                                        defaultValue={ideaData?.targetAudience || ""}
                                        type="text"
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400
                                            ${errors.targetAudience ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
                                        placeholder="e.g., Rural Patients, Founders"
                                    />
                                </div>
                                {errors.targetAudience && <p className="text-red-500 text-xs font-medium pl-1">{errors.targetAudience.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 03: Feasibility Study */}
                    <div className="space-y-6">
                        <h2 className="text-xs font-black uppercase tracking-widest text-orange-500 border-b border-gray-100 dark:border-gray-900 pb-2">
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
                                        key={ideaData?.problemStatement || "problem-empty"}
                                        defaultValue={ideaData?.problemStatement || ""}
                                        rows={3}
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 resize-none
                                            ${errors.problemStatement ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
                                        placeholder="What critical crisis does this idea resolve?"
                                    />
                                </div>
                                {errors.problemStatement && <p className="text-red-500 text-xs font-medium pl-1">{errors.problemStatement.message}</p>}
                            </div>

                            {/* Proposed Solution */}
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">Proposed Solution *</label>
                                <div className="relative">
                                    <span className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400">
                                        <Lightbulb size={16} />
                                    </span>
                                    <textarea
                                        {...register("proposedSolution", { required: "Proposed solution details are required" })}
                                        key={ideaData?.proposedSolution || "solution-empty"}
                                        defaultValue={ideaData?.proposedSolution || ""}
                                        rows={3}
                                        className={`w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 resize-none
                                            ${errors.proposedSolution ? "border-red-500 focus:ring-red-500/10" : "border-gray-200 dark:border-gray-800 focus:border-orange-500 focus:ring-orange-500/10"}`}
                                        placeholder="How does your architecture feature mitigate the problem?"
                                    />
                                </div>
                                {errors.proposedSolution && <p className="text-red-500 text-xs font-medium pl-1">{errors.proposedSolution.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Central Error Summary Notice */}
                    {Object.keys(errors).length > 0 && (
                        <div className="p-4 bg-red-500/5 dark:bg-red-500/[0.02] rounded-2xl border border-red-500/15 text-red-500 text-xs font-medium flex items-center gap-2.5">
                            <ShieldAlert size={16} className="shrink-0" />
                            <span>Some fields contain invalid inputs or are missing. Please re-check validation.</span>
                        </div>
                    )}

                    {/* Submit Action Block */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-900/40">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/10 disabled:opacity-70 transition-all cursor-pointer"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={14} />}
                            {isSubmitting ? "Syncing Telemetry..." : "Push System Updates"}
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
}