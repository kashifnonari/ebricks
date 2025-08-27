"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaAlignJustify } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { MdContactPhone } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { LuBrickWall } from "react-icons/lu";
import { TbLogin, TbLogout } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isToggle, setIsToggle] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    }, []);

    // Listen for login/logout changes across tabs
    useEffect(() => {
        const handler = () => setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        router.push("/login");
    };

    const links = [
        { href: '/', icon: <IoMdHome />, label: 'Home' },
        { href: '/bricks', icon: <LuBrickWall />, label: 'Bricks' },
        { href: '/contact', icon: <MdContactPhone />, label: 'Contact' },
        { href: '/cart', icon: <FaShoppingCart />, label: 'Cart' },
        isLoggedIn
            ? { href: '#', icon: <TbLogout />, label: 'Logout', onClick: handleLogout }
            : { href: '/login', icon: <TbLogin />, label: 'Login' },
    ];

    return (
        <header className={`w-full h-fit relative z-50 ${isToggle ? 'shadow-none' : 'shadow-md'}`}>
            <nav className="w-full flex justify-between items-center p-5 px-8">
                <Link href='/' className="text-xl font-bold">EBricks</Link>
                {/* Toggle Button */}
                <span onClick={() => setIsToggle(!isToggle)} className="md:hidden cursor-pointer">
                    <FaAlignJustify />
                </span>
                {/* Desktop View */}
                <ul className="hidden md:flex items-center gap-7">
                    {links.map((link, index) => (
                        <li key={index} className="flex items-center gap-1">
                            {link.onClick ? (
                                <button onClick={link.onClick} className="flex items-center gap-1 text-xl">
                                    {link.icon} <span className="text-base">{link.label}</span>
                                </button>
                            ) : (
                                <>
                                    <Link href={link.href} className="text-xl">{link.icon}</Link>
                                    <Link href={link.href}>{link.label}</Link>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Mobile View */}
            {isToggle && (
                <section className="md:hidden absolute top-16 left-0 z-[9999] bg-white transition-all duration-1000 ease-in-out opacity-100 translate-y-0">
                    <ul className="flex flex-col gap-3 py-3 pl-[40%] shadow-md w-screen justify-center">
                        {links.map((link, index) => (
                            <span key={index}>
                                <li className="flex items-center gap-1">
                                    {link.onClick ? (
                                        <button onClick={link.onClick} className="flex items-center gap-1 text-xl">
                                            {link.icon} <span className="text-base">{link.label}</span>
                                        </button>
                                    ) : (
                                        <>
                                            <Link href={link.href} className="text-xl">{link.icon}</Link>
                                            <Link href={link.href}>{link.label}</Link>
                                        </>
                                    )}
                                </li>
                            </span>
                        ))}
                    </ul>
                </section>
            )}
        </header>
    );
    }