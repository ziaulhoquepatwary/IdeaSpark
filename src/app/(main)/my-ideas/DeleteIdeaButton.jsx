"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { Eye, Edit3, Trash2 } from "lucide-react";


const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ActivityButton({ ideaId, ideaTitle }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const isDarkMode = document.documentElement.classList.contains("dark");

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Do you really want to terminate the pipeline: "${ideaTitle}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
            background: isDarkMode ? "#111111" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
        });

        if (!result.isConfirmed) return;

        try {
            setIsDeleting(true);

            const { data } = await axios.delete(
                `${API}/api/ideas/${ideaId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your innovation pipeline has been terminated.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    background: isDarkMode ? "#111111" : "#ffffff",
                    color: isDarkMode ? "#ffffff" : "#000000",
                });
                router.refresh();
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: err.response?.data?.message || "Failed to delete idea. Please try again.",
                icon: "error",
                background: isDarkMode ? "#111111" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center justify-end gap-1.5">
            <Link
                href={`/ideas/${ideaId}`}
                className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all"
                title="Inspect Blueprint"
            >
                <Eye size={15} />
            </Link>

            <Link
                href={`/ideas/edit/${ideaId}`}
                className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all"
                title="Modify Source"
            >
                <Edit3 size={15} />
            </Link>

            <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Terminate Pipeline"
            >
                {isDeleting ? (
                    <div className="w-[15px] h-[15px] rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
                ) : (
                    <Trash2 size={15} />
                )}
            </button>
        </div>
    );
}