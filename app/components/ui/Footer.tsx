'use client';

import React from 'react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-12 border-t border-kiln-sand/60 pt-6 pb-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3 text-[11px] tracking-wider font-medium text-kiln-navy/80 z-10 relative">
                <div className="flex items-center gap-4 uppercase font-bold">
                    <a href="#terms" className="hover:text-kiln-terracotta transition-colors">Terms of Service</a>
                    <span className="text-kiln-sand">|</span>
                    <a href="#privacy" className="hover:text-kiln-terracotta transition-colors">Privacy Policy</a>
                    <span className="text-kiln-sand">|</span>
                    <a href="#shipping" className="hover:text-kiln-terracotta transition-colors">Shipping Info</a>
                    <span className="text-kiln-sand">|</span>
                    <a href="#contact" className="hover:text-kiln-terracotta transition-colors">Contact Us</a>
                </div>
                <div className="text-center font-sans opacity-90">
                    © {currentYear} THE ARTISAN KILN. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};