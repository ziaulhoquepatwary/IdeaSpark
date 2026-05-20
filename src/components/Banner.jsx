"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Rocket, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const slides = [
        {
            tag: "Bring Ideas to Life",
            icon: <Rocket className="w-5 h-5 text-emerald-500" />,
            title: "Where Bold Ideas Meet Early Validation",
            desc: "Don't build in the dark. Share your startup concepts with a global community of innovators, get real-time feedback, and validate before you launch.",
            image: "/banner1.jpg",
        },
        {
            tag: "Empowering Innovators",
            icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
            title: "Spark the Next Big Disruption",
            desc: "From SaaS solutions to AI-driven platforms—discover groundbreaking concepts or post your own. The next unicorn startup might just start right here.",
            image: "/banner2.jpg",
        },
        {
            tag: "Collaborative Ecosystem",
            icon: <Users className="w-5 h-5 text-emerald-500" />,
            title: "Connect with Co-founders & Investors",
            desc: "Great things are never done by one person. Find like-minded individuals, network with domain experts, and turn your raw sparks into roaring fires.",
            image: "/banner3.jpg",
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: "spring", stiffness: 200, damping: 26 },
                opacity: { duration: 0.3 }
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
            transition: {
                x: { type: "spring", stiffness: 200, damping: 26 },
                opacity: { duration: 0.3 }
            }
        })
    };

    return (
        <section className="relative w-full bg-white dark:bg-[#0A0A0A] py-4 transition-colors duration-300 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0">
                <Image
                    src="/bg-img-new.jpg"
                    alt="Background"
                    fill
                    priority
                    className="object-cover blur-none lg:blur-sm transition-all duration-300"
                    suppressHydrationWarning
                />
                <div className="absolute inset-0 transition-colors duration-300" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-137.5 md:h-150 relative flex items-center justify-center z-10">

                <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
                    <div className="absolute top-12 left-12 w-72 h-72 bg-emerald-400 dark:bg-emerald-300 rounded-full filter blur-[100px]" />
                    <div className="absolute bottom-12 right-12 w-72 h-72 bg-orange-400 dark:bg-orange-300 rounded-full filter blur-[100px]" />
                </div>

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center absolute inset-0 px-4 sm:px-6 lg:px-8"
                    >
                        {/* Content Side */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide uppercase border border-emerald-200/50 dark:border-emerald-900/30">
                                {slides[currentSlide].icon}
                                {slides[currentSlide].tag}
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight text-gray-950 dark:text-white leading-[1.15]">
                                {slides[currentSlide].title}
                            </h1>

                            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-800 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                {slides[currentSlide].desc}
                            </p>

                            {/* CTA Button */}
                            <div className="pt-2">
                                <Link
                                    href="/ideas"
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium px-7 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-emerald-600/10 group text-sm sm:text-base"
                                >
                                    Explore Ideas
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="hidden lg:col-span-5 lg:block relative h-100 w-full group">
                            <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/10 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform duration-300" />
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-900 shadow-xl bg-gray-50 dark:bg-zinc-900">
                                <Image
                                    src={slides[currentSlide].image}
                                    alt={slides[currentSlide].title}
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-w-1024px) 100vw, 40vw"
                                    suppressHydrationWarning
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slide Indicators / Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 lg:left-8 lg:transform-none flex gap-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentSlide ? 1 : -1);
                                setCurrentSlide(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-6 bg-emerald-600 dark:bg-emerald-500" : "w-2 bg-gray-300 dark:bg-gray-700"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Banner;