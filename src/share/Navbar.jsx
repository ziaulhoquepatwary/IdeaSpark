"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaLightbulb, FaPlusCircle, FaBookmark, FaCommentDots, FaMoon, FaSun, FaBars, FaTimes, FaSignInAlt, FaUserPlus, } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const { data: session, isPending } = authClient.useSession();
    const pathname = usePathname();

    const user = session?.user;
    // console.log(user);


    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        setTheme(savedTheme);
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const ThemeIcon = mounted
        ? theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />
        : <span className="w-4 h-4 block" />;

    const MobileThemeIcon = mounted
        ? theme === "dark" ? <FaSun className="text-yellow-500" /> : <FaMoon />
        : <span className="w-4 h-4 block" />;

    const getLinkClass = (path) => {
        const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200";
        const activeClass = "bg-emerald-600 dark:bg-emerald-500 text-white";
        const inactiveClass = "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400";

        return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
    };

    const getMobileLinkClass = (path) => {
        const baseClass = "flex items-center gap-3 p-3 rounded-lg font-medium transition-colors";
        const activeClass = "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400";
        const inactiveClass = "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300";

        return `${baseClass} ${pathname === path ? activeClass : inactiveClass}`;
    };

    return (
        <nav className="bg-white dark:bg-[#0A0A0A] text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-2xl font-bold font-heading tracking-tight sm:text-2xl md:text-3xl">
                            <span className="text-emerald-600 dark:text-emerald-500">Idea</span>
                            <span className="text-orange-500">Spark</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1 lg:space-x-2 text-[15px]">
                        <Link href="/" className={getLinkClass("/")}>
                            <FaHome /> Home
                        </Link>
                        <Link href="/ideas" className={getLinkClass("/ideas")}>
                            <FaLightbulb /> Ideas
                        </Link>
                        {
                            user && (
                                <>
                                    <Link href="/add-idea" className={getLinkClass("/add-idea")}>
                                        <FaPlusCircle /> Add Idea
                                    </Link>
                                    <Link href="/my-ideas" className={getLinkClass("/my-ideas")}>
                                        <FaBookmark /> My Ideas
                                    </Link>
                                    <Link href="/interactions" className={getLinkClass("/interactions")}>
                                        <FaCommentDots /> My Interactions
                                    </Link>
                                </>
                            )
                        }
                    </div>

                    {/* Right Side Icons & Auth — Desktop */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2.5 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                        >
                            {ThemeIcon}
                        </button>
                        {
                            isPending ? (
                                <div className="w-9 h-9 rounded-full bg-sky-400 animate-pulse" />
                            ) : user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setAvatarMenuOpen(prev => !prev)}
                                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#42D3F2] hover:opacity-90 transition-opacity"
                                    >
                                        <img
                                            src={user?.image || "/user.png"}
                                            alt={user?.name}
                                            className="object-cover w-10 h-10"
                                        />
                                    </button>

                                    {/* Desktop Avatar Dropdown with Dark Mode Support */}
                                    {avatarMenuOpen && (
                                        <div className="absolute right-0 top-12 w-56 bg-white dark:bg-[#0A0A0A] rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg shadow-cyan-50 dark:shadow-none z-50">
                                            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                                <img
                                                    src={user?.image || "/user.png"}
                                                    alt={user?.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="overflow-hidden">
                                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{user?.name}</p>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
                                                </div>
                                            </div>

                                            <div className="p-2">
                                                <Link
                                                    href="/my-profile"
                                                    onClick={() => setAvatarMenuOpen(false)}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-cyan-50 dark:hover:bg-gray-900 hover:text-[#42D3F2] dark:hover:text-[#42D3F2] transition-colors"
                                                >
                                                    <User size={15} />
                                                    My Profile
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setAvatarMenuOpen(false);
                                                        authClient.signOut({
                                                            fetchOptions: {
                                                                onSuccess: () => {
                                                                    window.location.href = "/";
                                                                }
                                                            }
                                                        });
                                                    }}
                                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                                >
                                                    <LogOut size={15} />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <Link href="/login" className="flex items-center gap-2 border border-gray-200 dark:border-gray-800 px-5 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all font-medium text-gray-700 dark:text-gray-300">
                                        <FaSignInAlt /> Login
                                    </Link>

                                    <Link href="/register" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl transition-all font-medium shadow-sm shadow-emerald-600/10">
                                        <FaUserPlus /> Register
                                    </Link>
                                </div>
                            )
                        }
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg"
                        >
                            {MobileThemeIcon}
                        </button>
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                            className="p-2 text-2xl text-gray-600 dark:text-gray-300"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-6 flex flex-col space-y-3">
                    <Link href="/" onClick={() => setIsOpen(false)} className={getMobileLinkClass("/")}>
                        <FaHome /> Home
                    </Link>
                    <Link href="/ideas" onClick={() => setIsOpen(false)} className={getMobileLinkClass("/ideas")}>
                        <FaLightbulb /> Ideas
                    </Link>
                    {user && (
                        <>
                            <Link href="/add-idea" onClick={() => setIsOpen(false)} className={getMobileLinkClass("/add-idea")}>
                                <FaPlusCircle /> Add Idea
                            </Link>
                            <Link href="/my-ideas" onClick={() => setIsOpen(false)} className={getMobileLinkClass("/my-ideas")}>
                                <FaBookmark /> My Ideas
                            </Link>
                            <Link href="/interactions" onClick={() => setIsOpen(false)} className={getMobileLinkClass("/interactions")}>
                                <FaCommentDots /> My Interactions
                            </Link>
                        </>
                    )}

                    <div className="pt-2 flex flex-col space-y-2 border-t border-gray-100 dark:border-gray-800">
                        {isPending ? (
                            <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
                        ) : user ? (
                            <div className="flex flex-col space-y-3">
                                <div className="flex items-center gap-3 p-2">
                                    <img
                                        src={user?.image || "/user.png"}
                                        alt={user?.name}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-[#42D3F2]"
                                    />
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{user?.name}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                </div>
                                <Link
                                    href="/my-profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-800 w-full py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                                >
                                    <User size={16} /> My Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        authClient.signOut({
                                            fetchOptions: {
                                                onSuccess: () => {
                                                    window.location.href = "/";
                                                }
                                            }
                                        });
                                    }}
                                    className="flex items-center justify-center gap-2 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 w-full py-3 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-800 w-full py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300">
                                    <FaSignInAlt /> Login
                                </Link>

                                <Link href="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-emerald-600 text-white w-full py-3 rounded-xl font-medium shadow-sm">
                                    <FaUserPlus /> Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;