"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import IdeaCart from "./IdeaCart";

const CATEGORIES = ["All", "Tech", "Health", "AI", "Education", "Finance", "Environment", "Other"];

function IdeasClient({ initialIdeas, initialPagination, initialSearch, initialCategory, initialSortBy }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateURL = useCallback((newParams) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newParams).forEach(([key, value]) => {
            if (value && value !== "All") {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        if (!("page" in newParams)) {
            params.delete("page");
        }

        router.push(`${pathname}?${params.toString()}`);
    }, [searchParams, pathname, router]);

    return (
        <div className="space-y-4">

            {/* Search, Filter & Sort */}
            <div className="bg-gray-50/50 dark:bg-[#111111]/30 border border-gray-100 dark:border-gray-900/80 p-5 rounded-3xl backdrop-blur-md shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

                    {/* Search Bar */}
                    <div className="relative w-full lg:max-w-md">
                        <Search size={18} className="absolute inset-y-0 left-3.5 my-auto text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by idea title..."
                            defaultValue={initialSearch}
                            onKeyDown={(e) => e.key === "Enter" && updateURL({ search: e.target.value })}
                            onBlur={(e) => updateURL({ search: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 px-3.5 py-2.5 rounded-2xl shadow-sm">
                            <SlidersHorizontal size={14} className="text-gray-400" />
                            <select
                                defaultValue={initialCategory}
                                onChange={(e) => updateURL({ category: e.target.value })}
                                className="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer text-xs font-medium uppercase tracking-wider"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat} className="bg-white dark:bg-[#111111] normal-case">
                                        {cat === "All" ? "All Categories" : cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-gray-800 px-3.5 py-2.5 rounded-2xl shadow-sm">
                            <ArrowUpDown size={14} className="text-gray-400" />
                            <select
                                defaultValue={initialSortBy}
                                onChange={(e) => updateURL({ sortBy: e.target.value })}
                                className="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer text-xs font-medium uppercase tracking-wider"
                            >
                                <option value="createdAt">Newest First</option>
                                <option value="likes">Most Liked</option>
                                <option value="title">A → Z</option>
                            </select>
                        </div>

                        {/* Total Count */}
                        <div className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                            <LayoutGrid size={14} /> {initialPagination.total} Found
                        </div>
                    </div>
                </div>
            </div>

            {/* Ideas Grid */}
            {initialIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {initialIdeas.map((idea) => (
                        <IdeaCart key={idea._id} idea={idea} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 max-w-xl mx-auto space-y-4">
                    <div className="inline-flex p-4 rounded-2xl bg-orange-500/10 text-orange-500">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-950 dark:text-white">No Ideas Found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Try changing your filters or search query.</p>
                    <button
                        onClick={() => router.push(pathname)}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-wider"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}

            {/* Pagination */}
            {initialPagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                    <button
                        onClick={() => updateURL({ page: String(initialPagination.page - 1) })}
                        disabled={initialPagination.page <= 1}
                        className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: initialPagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => updateURL({ page: String(pageNum) })}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all
                                ${initialPagination.page === pageNum
                                    ? "bg-emerald-600 text-white border border-emerald-600"
                                    : "border border-gray-200 dark:border-gray-800 text-gray-500 hover:border-emerald-500 hover:text-emerald-500"
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    <button
                        onClick={() => updateURL({ page: String(initialPagination.page + 1) })}
                        disabled={initialPagination.page >= initialPagination.totalPages}
                        className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default IdeasClient;