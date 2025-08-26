"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaAlignJustify } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { MdContactPhone } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { LuBrickWall } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";

export default function Navbar() {
    const [isToggle, setIsToggle] = useState(false);
    const links = [
        { href: '/', icon: <IoMdHome />, label: 'Home' },
        { href: '/bricks', icon: <LuBrickWall />, label: 'Bricks' },
        { href: '/contact', icon: <MdContactPhone />, label: 'Contact' },
        { href: '/cart', icon: <FaShoppingCart />, label: 'Cart' },
        { href: '/logout', icon: <IoIosLogOut />, label: 'Logout' },
    ]

    return (
        <header
            className={`w-full h-fit relative z-50
                ${isToggle ? 'shadow-none' : 'shadow-md'
                }
                `}
        >
            <nav className="w-full flex justify-between items-center p-5 px-8">
                <Link href='/' className="text-xl font-bold">EBricks</Link>

                {/* Toggle Button */}
                <span
                    onClick={() => setIsToggle(!isToggle)}
                    className="md:hidden cursor-pointer">
                    <FaAlignJustify />
                </span>

                {/* Desktop View */}
                <ul className="hidden md:flex items-center gap-7">
                    {
                        links.map((link, index) => (
                            <li key={index} className="flex items-center gap-1">
                                <Link href={link.href} className="text-xl" > {link.icon} </Link>
                                <Link href={link.href} > {link.label} </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            {/* Mobile View */}
            {
                isToggle &&
                <section
                    className="md:hidden absolute top-16 left-0 z-[9999] bg-white transition-all duration-1000 ease-in-out opacity-100 translate-y-0">
                    <ul className="flex flex-col gap-3 py-3 pl-[40%] shadow-md w-screen justify-center">
                        {
                            links.map((link, index) => (
                                <span key={index}>
                                    <li className="flex items-center gap-1">
                                        <Link href={link.href} className="text-xl" > {link.icon} </Link>
                                        <Link href={link.href} > {link.label} </Link>
                                    </li>
                                </span>
                            ))
                        }
                    </ul>
                </section>
            }
        </header >
    );
}
