"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { FaRegFileCode, FaUsers, FaHandshake } from 'react-icons/fa6';
import { HiOutlineCircleStack } from 'react-icons/hi2';

const Counter = ({ from, to }) => {
    const nodeRef = useRef(null);
    const motionValue = useMotionValue(from);
    const rounded = useTransform(motionValue, (latest) => Math.round(latest));
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(motionValue, to, { duration: 1.8, ease: "easeOut" });
            return () => controls.stop();
        }
    }, [motionValue, to, isInView]);

    return <motion.span ref={nodeRef}>{rounded}</motion.span>;
};

const StatsSection = () => {
    const stats = [
        {
            icon: <FaRegFileCode className="w-8 h-8 sm:w-9 sm:h-9 text-orange-500" />,
            value: 153,
            hasPlus: false,
            label: "Delivered Ideas"
        },
        {
            icon: <FaUsers className="w-8 h-8 sm:w-9 sm:h-9 text-orange-500" />,
            value: 80,
            hasPlus: true,
            label: "Members & Discussions"
        },
        {
            icon: <HiOutlineCircleStack className="w-8 h-8 sm:w-9 sm:h-9 text-orange-500" />,
            value: 93,
            hasPlus: false,
            label: "Validation Interests"
        },
        {
            icon: <FaHandshake className="w-8 h-8 sm:w-9 sm:h-9 text-orange-500" />,
            value: 25,
            hasPlus: true,
            label: "Assisted Connections"
        }
    ];

    return (
        <section className="w-full bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white py-10 border-t border-b border-gray-100 dark:border-gray-900 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-8 text-center"
                >
                    {stats.map((stat, index) => (
                        <div 
                            key={index}
                            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 sm:px-4
                                ${index % 2 === 0 ? "md:border-r border-gray-100 dark:border-gray-800/60" : ""}
                                ${index !== stats.length - 1 ? "xl:border-r xl:border-b-0" : ""}
                            `}
                        >
                            <div className="shrink-0 p-2.5 sm:p-3 bg-orange-500/5 dark:bg-orange-500/10 rounded-xl border border-orange-500/10">
                                {stat.icon}
                            </div>

                            {/* Text & Counter Box */}
                            <div className="text-center sm:text-left space-y-0.5 min-w-0">
                                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading text-gray-950 dark:text-white">
                                    <Counter from={0} to={stat.value} />
                                    {stat.hasPlus && "+"}
                                </h3>
                                <p className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400 truncate">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default StatsSection;