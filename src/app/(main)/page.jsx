'use client';

import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import Banner from "@/components/Banner"

// Above-the-fold: Immediate render
// Below-the-fold: Lazy load with Suspense
const StatsSection = dynamic(() => import("@/components/StatsSection"), {
    loading: () => <div className="h-40 bg-gray-50 dark:bg-gray-900 animate-pulse" />,
    ssr: true,
});

const TrendingIdeas = dynamic(() => import("@/components/TrendingIdeas"), {
    loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse" />,
    ssr: true,
});

const WhyUsSection = dynamic(() => import("@/components/WhyUsSection"), {
    loading: () => <div className="h-80 bg-gray-50 dark:bg-gray-900 animate-pulse" />,
    ssr: true,
});

function Home() {
    return (
        <>
            <Banner />
            <Suspense fallback={<div className="h-40 bg-gray-50 dark:bg-gray-900" />}>
                <StatsSection />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-50 dark:bg-gray-900" />}>
                <TrendingIdeas />
            </Suspense>
            <Suspense fallback={<div className="h-80 bg-gray-50 dark:bg-gray-900" />}>
                <WhyUsSection />
            </Suspense>
        </>
    )
}

export default Home