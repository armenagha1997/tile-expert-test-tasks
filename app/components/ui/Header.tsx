'use client';

import React, {useEffect, useState} from 'react';
import {useAppSelector} from '@/store/hooks';
import {useOutsideClick} from "@/hooks/useOutsideClick";

const navLinks = [
    {name: 'HOME', href: '#home'},
    {name: 'SHOP', href: '#shop'},
    {name: 'COLLECTIONS', href: '#collections'},
    {name: 'ABOUT US', href: '#about'},
    {name: 'FAQ', href: '#faq'},
    {name: 'GALLERY', href: '#gallery'},
    {name: 'BLOG', href: '#blog'},
];

export const Header: React.FC = () => {
    const items = useAppSelector((state) => state.cart.items);
    const activeItemsCount = items.filter(item => item.quantity > 0).length;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeLink, setActiveLink] = useState('HOME');

    const menuRef = useOutsideClick<HTMLDivElement>(
        () => setIsMobileMenuOpen(false),
        isMobileMenuOpen
    );

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDarkMode(isDark);
    }, []);

    const toggleDarkMode = () => {
        const nextDark = !isDarkMode;
        setIsDarkMode(nextDark);

        if (nextDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="w-full text-kiln-navy border-b border-kiln-navy/30 pb-4 relative">
            <nav
                className="flex justify-between items-center py-3 px-4 md:px-8  border-b border-kiln-navy/20 text-xs font-bold tracking-widest uppercase">
                <div className="flex-1 md:w-1/3 flex items-center justify-start">
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-xl p-2 focus:outline-none select-none"
                            type="button"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between items-center relative">
                                <span
                                    className={`w-6 h-0.5 bg-kiln-navy rounded-full transform transition-all duration-300 ease-in-out ${
                                        isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                                    }`}
                                />
                                <span
                                    className={`w-6 h-0.5 bg-kiln-navy rounded-full transition-all duration-200 ease-in-out ${
                                        isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                                    }`}
                                />
                                <span
                                    className={`w-6 h-0.5 bg-kiln-navy rounded-full transform transition-all duration-300 ease-in-out ${
                                        isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
                <div className="hidden md:flex md:w-1/3 justify-center items-center gap-6 lg:gap-8 whitespace-nowrap">
                    {navLinks.map((link) => {
                        const isActive = activeLink === link.name;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveLink(link.name)}
                                className={`transition-all duration-200 pb-0.5 tracking-widest hover:text-kiln-terracotta ${
                                    isActive
                                        ? 'text-kiln-navy font-black border-b-2 border-kiln-navy'
                                        : 'text-kiln-navy/70 font-bold border-b-2 border-transparent'
                                }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>
                <div className="flex-grow md:flex-1 md:w-1/3 flex items-center justify-end gap-4">
                    <div className="relative flex items-center gap-1 cursor-pointer group">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                        {activeItemsCount > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-kiln-terracotta text-white font-sans text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {activeItemsCount}
                            </span>
                        )}
                    </div>
                    <div
                        className="flex items-center gap-1.5 border border-kiln-navy/60 rounded-full px-3 py-1 bg-white/40 cursor-pointer hover:bg-white/80 transition-all text-[11px]">
                        <div
                            className="w-4 h-4 rounded-full bg-kiln-navy text-white flex items-center justify-center text-[9px]">
                            A
                        </div>
                        <span className="hidden md:inline font-sans font-medium text-gray-700">A. Smith</span>
                        <span className="md:hidden font-sans font-medium text-gray-700">Log In</span>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className="p-1.5 border border-kiln-navy/40 dark:border-kiln-navy-dark/40 rounded-full bg-white/20 hover:bg-white/60 dark:hover:bg-zinc-800/60 text-sm transition-all active:scale-90"
                        type="button"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        <div
                            className="w-5 h-5 flex items-center justify-center transition-transform duration-300 ease-in-out">
                            {isDarkMode ? (
                                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.06 1.06c.39.39.39 1.03 0 1.41s-1.03.39-1.41 0l-1.06-1.06zM7.05 18.36c-.39-.39-.39-1.03 0-1.41s1.03-.39 1.41 0l1.06 1.06c.39.39.39 1.03 0 1.41s-1.03.39-1.41 0l-1.06-1.06z"/>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-kiln-navy" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12.3 2a10 10 0 0 0-1.9 19.8 10 10 0 0 0 11.5-11.5 10.1 10.1 0 0 1-9.6-8.3z"/>
                                </svg>
                            )}
                        </div>
                    </button>
                </div>
            </nav>
            {isMobileMenuOpen && (
                <div ref={menuRef}
                     className="absolute top-[45px] left-0 w-full bg-[#F4EFE6] border-b-2 border-kiln-navy z-50 flex flex-col items-center py-4 gap-3 text-xs font-bold tracking-widest border-t border-kiln-navy/10 md:hidden">
                    {navLinks.map((link) => {
                        const isActive = activeLink === link.name;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => {
                                    setActiveLink(link.name);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`py-2.5 w-full text-center transition-colors uppercase ${
                                    isActive
                                        ? 'bg-kiln-sand text-kiln-terracotta font-black'
                                        : 'hover:bg-kiln-sand/30 text-kiln-navy'
                                }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}

                </div>
            )}
            <div className="flex justify-between items-center mt-6 px-4 max-w-5xl mx-auto">
                <div className="flex-1 flex flex-col items-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-widest font-display text-center uppercase text-kiln-navy">
                        CERAMIC TILE ORDER FORM
                    </h1>
                    <div className="flex items-center gap-4 mt-1.5 mb-1 text-[10px] font-bold select-none">
                        <img src="/tiles/navy.png" alt="Navy tile icon"
                             className="w-8 h-8 rounded-sm object-cover shadow-sm grayscale-[10%] hover:grayscale-0 transition-all duration-200"/>
                        <img src="/tiles/terracotta.png" alt="Terracotta tile icon"
                             className="w-8 h-8 rounded-sm object-cover shadow-sm opacity-90"/>
                        <img src="/tiles/sage.png" alt="Sage tile icon"
                             className="w-8 h-8 rounded-sm object-cover shadow-sm"/>
                        <span className="mx-3 tracking-widest text-lg sm:text-xl md:text-2xl text-kiln-navy font-mono font-bold uppercase">
                          THE ARTISAN KILN
                        </span>
                        <img src="/tiles/geometric.png" alt="Geometric Kiln"
                                    className="w-8 h-8 rounded-sm object-cover shadow-sm"/>
                        <img src="/tiles/flora.png" alt="Vintage Flora"
                             className="w-8 h-8 rounded-sm object-cover shadow-sm opacity-90 hover:opacity-100 transition-opacity duration-200"/>
                        <img src="/tiles/golden.png" alt="Golden Herringbone"
                             className="w-8 h-8 rounded-sm object-cover shadow-sm grayscale-[10%] hover:grayscale-0 transition-all duration-200"/>
                    </div>
                </div>
            </div>

        </div>
    );
};