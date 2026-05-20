import React from "react";
import { Lightbulb } from "lucide-react";
import IdeasClient from "@/components/IdeasClient";
import fetchIdeas from "@/app/utils/fetchIdeas";

async function IdeasPage({ searchParams }) {
    const resolvedParams = await searchParams;
    const search = resolvedParams?.search || "";
    const category = resolvedParams?.category || "All";
    const sortBy = resolvedParams?.sortBy || "createdAt";
    const page = resolvedParams?.page || "1";

    const { ideas, pagination } = await fetchIdeas({ search, category, sortBy, page });

    return (
        <section className="min-h-screen bg-white dark:bg-[#0A0A0A] py-6 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-12 left-12 w-80 h-80 bg-emerald-400 rounded-full filter blur-[100px]" />
                <div className="absolute bottom-12 right-12 w-72 h-72 bg-orange-400 rounded-full filter blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto space-y-5 relative z-10">
                {/* Header */}
                <div className="text-center md:text-left space-y-3 max-w-3xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-200/20">
                        <Lightbulb className="w-3.5 h-3.5" /> Discovery Hub
                    </div>
                    <h1 className="text-3xl font-extrabold font-heading tracking-tight text-gray-950 dark:text-white sm:text-5xl">
                        All Innovation <span className="text-emerald-600 dark:text-emerald-500">Pipelines</span>
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                        Browse, filter, and sort through the highest potential startup concepts.
                    </p>
                </div>

                <IdeasClient
                    initialIdeas={ideas}
                    initialPagination={pagination}
                    initialSearch={search}
                    initialCategory={category}
                    initialSortBy={sortBy}
                />
            </div>
        </section>
    );
}

export default IdeasPage;