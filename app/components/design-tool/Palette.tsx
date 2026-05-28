'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';

export const Palette: React.FC = () => {
    const items = useAppSelector((state) => state.cart.items);

    const handleDragStart = (e: React.DragEvent, patternImage: string) => {
        e.dataTransfer.setData('text/plain', patternImage);
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div className="flex flex-col gap-3 p-2 bg-kiln-sand/20 border-l border-kiln-sand h-full">
            <h3 className="text-xs font-bold tracking-wider text-center border-b pb-1">DESIGN PALETTE</h3>
            <div className="grid grid-cols-2     gap-2 overflow-y-auto max-h-[350px]">
                {items.map((item) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.patternImage)}
                        className="cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-kiln-navy rounded bg-black transition-all shadow-sm group relative"
                    >
                        <img src={item.patternImage} alt={item.name} className="w-full aspect-square object-cover rounded" />
                        <div className="absolute inset-0 bg-kiln-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
                            <span className="text-[10px] text-white font-bold font-sans">DRAG ME</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};