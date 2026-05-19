import { ArrowUpRight, Heart, Lightbulb, Target, Users, Wallet } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function safeSlice(text, limit) {
    if (!text) return ""
    if (text.length <= limit) return text
    return text.slice(0, limit) + "..."
}

function IdeaCart({ idea }) {
    return (
        <div
            className="group relative flex flex-col bg-gray-50 dark:bg-[#111111]/40 border border-gray-100 dark:border-gray-900/60 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-600/5 dark:hover:shadow-emerald-500/5 hover:border-gray-200 dark:hover:border-emerald-500/20"
        >

            {/* Card Image Block */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-zinc-800">
                <Image
                    src={idea.imageUrl}
                    alt={idea.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-90" />

                <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-gray-200/20 shadow-sm">
                    {idea.category}
                </span>
            </div>

            {/* Card Body Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5 relative">

                <div className="space-y-3">
                    <h3 className="text-xl font-bold font-heading text-gray-950 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 leading-snug">
                        {idea.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {safeSlice(idea.shortDesc, 80)}
                    </p>

                    <div className="grid grid-cols-1 gap-2.5 pt-2 border-t border-b border-gray-100 dark:border-gray-900/40 py-3 text-xs">

                        {/* Problem Teaser */}
                        <div className="flex gap-2 text-gray-700 dark:text-gray-300 relative overflow-hidden pr-4">
                            <Target className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span className="truncate">
                                <strong>Problem:</strong> {safeSlice(idea.problem, 45)}
                            </span>
                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-gray-50 dark:to-[#121212] pointer-events-none" />
                        </div>

                        {/* Solution Teaser */}
                        <div className="flex gap-2 text-gray-700 dark:text-gray-300 relative overflow-hidden pr-4">
                            <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="truncate">
                                <strong>Solution:</strong> {safeSlice(idea.solution, 45)}
                            </span>
                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-gray-50 dark:to-[#121212] pointer-events-none" />
                        </div>

                    </div>
                </div>

                {/* Budget & Target Audience Container */}
                <div className="grid grid-cols-2 gap-4 bg-gray-100/60 dark:bg-zinc-900/30 p-3 rounded-2xl text-xs">
                    <div className="space-y-0.5">
                        <span className="text-gray-400 flex items-center gap-1 uppercase font-semibold text-[10px] tracking-wider">
                            <Wallet className="w-3 h-3 text-gray-400" /> Est. Budget
                        </span>
                        <span className="font-bold text-gray-900 dark:text-gray-200">{idea.budget}</span>
                    </div>
                    <div className="space-y-0.5 min-w-0">
                        <span className="text-gray-400 flex items-center gap-1 uppercase font-semibold text-[10px] tracking-wider">
                            <Users className="w-3 h-3 text-gray-400" /> Target
                        </span>
                        <span className="font-bold text-gray-900 dark:text-gray-200 block truncate">{idea.targetAudience}</span>
                    </div>
                </div>

                {/* Footer Tags, Like Button & Details Button */}
                <div className="flex items-center justify-between gap-2 pt-2">
                    <div className="flex flex-wrap gap-1.5 min-w-0">
                        {idea.tags?.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] font-medium px-2 py-0.5 bg-gray-200/50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {/* Like Button — design only */}
                        <button
                            aria-label="Like this idea"
                            className="p-2.5 rounded-xl bg-rose-500/10 text-orange-400 hover:text-orange-800 transition-all duration-300 cursor-pointer"
                        >
                            <Heart className="w-5 h-5" />
                        </button>

                        <Link
                            href={`/ideas/${idea.id}`}
                            className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500 dark:group-hover:text-white transition-all duration-300"
                            aria-label="View Detailed Description"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default IdeaCart