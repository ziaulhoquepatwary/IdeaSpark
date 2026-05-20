import Link from 'next/link';
import { ArrowUpRight, Activity } from 'lucide-react';
import IdeaCart from './IdeaCart';
import fetchTrendingIdeas from '@/app/utils/fetchTrendingIdeas';

const TrendingIdeas = async () => {

    const ideas = await fetchTrendingIdeas();

    return (
        <section className="w-full bg-white dark:bg-[#0A0A0A] py-10 md:py-14 text-gray-900 dark:text-white border-t border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 text-center md:text-left gap-4">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wider border border-orange-200/30">
                            <Activity className="w-3.5 h-3.5" /> Trending Frameworks
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-gray-950 dark:text-white">
                            Explore High-Potential <span className="text-emerald-600 dark:text-emerald-500">Startup Ideas</span>
                        </h2>
                    </div>
                    <Link href="/ideas" className="group flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                        View All Ideas <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {ideas?.map((idea) => (
                        <IdeaCart key={idea._id} idea={idea} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrendingIdeas;