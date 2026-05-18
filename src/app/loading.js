export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0A] transition-colors duration-300">

            {/* Minimal Background (No blur for performance) */}
            <div className="absolute inset-0 opacity-5 dark:opacity-2 pointer-events-none" />

            {/* Lightweight Spinner - CSS only, no JavaScript */}
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="w-12 h-12 border-3 border-emerald-500/10 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin" />

                {/* Inner Ring - reversed */}
                <div className="absolute w-8 h-8 border-3 border-orange-500/10 border-b-orange-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />

                {/* Center Dot */}
                <div className="absolute w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-500 rounded-full" />
            </div>

            {/* Minimal Text */}
            <div className="mt-6 text-center space-y-1">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Igniting <span className="text-emerald-600 dark:text-emerald-500">Ideas...</span>
                </h3>
            </div>
        </div>
    );
}