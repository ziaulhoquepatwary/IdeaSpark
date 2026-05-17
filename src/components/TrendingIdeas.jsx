import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Lightbulb, Wallet, Users, Target, Activity } from 'lucide-react';
import IdeaCart from './IdeaCart';

const TrendingIdeas = () => {
    const ideas = [
        {
            id: "idea-1",
            title: "MediConnect: AI-Driven Rural Health Diagnostics",
            shortDesc: "Bridging the gap between rural clinics and expert doctors using lightweight AI diagnostic tools.",
            category: "Health",
            tags: ["Telehealth", "AI", "RuralCare"],
            imageUrl: "/banner1.jpg",
            budget: "$15,000",
            targetAudience: "Rural patients",
            problem: "Lack of specialized doctors in remote villages leads to delayed and incorrect treatments.",
            solution: "An offline-first AI tablet app that performs preliminary diagnostics and syncs with city specialists."
        },
        {
            id: "idea-2",
            title: "EduSphere: Decentralized Peer Learning",
            shortDesc: "A blockchain-powered learning ecosystem where students teach and earn secure micro-incentives.",
            category: "Education",
            tags: ["Web3", "EdTech", "P2P"],
            imageUrl: "/banner2.jpg",
            budget: "$8,500",
            targetAudience: "University students",
            problem: "Traditional online courses have a 90% drop-out rate due to a lack of motivation and interaction.",
            solution: "A gamified, peer-to-peer micro-learning network incentivized through community-backed tokens."
        },
        {
            id: "idea-3",
            title: "EcoRoute: Green Logistics Router",
            shortDesc: "An enterprise API reducing fleet carbon footprints through real-time traffic and eco-data analysis.",
            category: "Tech",
            tags: ["SaaS", "GreenTech", "Logistics"],
            imageUrl: "/banner3.jpg",
            budget: "$22,000",
            targetAudience: "E-commerce giants",
            problem: "Inefficient route mapping causes millions of tons of excess CO2 emissions in urban deliveries.",
            solution: "An advanced machine-learning algorithm that predicts emission-heavy zones and reroutes fleets dynamically."
        },
        {
            id: "idea-4",
            title: "ScribeAI: Automated Legal Document Auditor",
            shortDesc: "Instantly audit complex corporate contracts for hidden risks and compliance flaws using LLMs.",
            category: "AI",
            tags: ["LegalTech", "LLM", "B2B"],
            imageUrl: "/banner1.jpg",
            budget: "$12,000",
            targetAudience: "Startup founders",
            problem: "Hiring lawyers for initial document vetting is prohibitively expensive for early-stage companies.",
            solution: "A finely-tuned AI model trained on regional corporate laws that highlights risk parameters in seconds."
        },
        {
            id: "idea-5",
            title: "AquaMonitor: IoT Smart FinTech Farming",
            shortDesc: "IoT water sensors combined with micro-credit scoring for small-scale shrimp farmers.",
            category: "Tech",
            tags: ["IoT", "AgriTech", "FinTech"],
            imageUrl: "/banner2.jpg",
            budget: "$18,500",
            targetAudience: "Aquaculture farmers",
            problem: "Sudden water contamination ruins entire harvests, making farmers high-risk for traditional bank loans.",
            solution: "IoT sensors track water pH/oxygen, alerting farmers and generating a trust score for instant bank credits."
        },
        {
            id: "idea-6",
            title: "MindBuddy: Corporate Burnout Preventer",
            shortDesc: "An anonymous slack integration tracking mental health trends through semantic analysis.",
            category: "Health",
            tags: ["HR-Tech", "AI", "Wellness"],
            imageUrl: "/banner3.jpg",
            budget: "$6,000",
            targetAudience: "HR heads",
            problem: "High employee turnover caused by silent workplace burnout that companies fail to detect early.",
            solution: "An AI slack-bot that safely reviews public channels' sentiment to give HRs real-time aggregated team mood data."
        }
    ];

    return (
        <section className="w-full bg-white dark:bg-[#0A0A0A] py-16 md:py-24 text-gray-900 dark:text-white border-t border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
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

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {ideas.map((idea) => (
                        <IdeaCart key={idea.id} idea={idea} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrendingIdeas;