'use client';

import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {addNewTile} from '@/store/cartSlice';
import {TileItem} from '@/types';
import {useOutsideClick} from "@/hooks/useOutsideClick";
import {AVAILABLE_EXTRA_TILES} from "@/constants/tiles";

export const AddTileButton: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentItems = useAppSelector((state) => state.cart.items);
    const [isOpen, setIsOpen] = useState(false);

    const tileListRef = useOutsideClick<HTMLDivElement>(
        () => setIsOpen(false),
        isOpen
    );

    const availableTo = AVAILABLE_EXTRA_TILES.filter(
        (extra) => !currentItems.some((current) => current.id === extra.id)
    );

    const handleSelectTile = (tile: TileItem) => {
        dispatch(addNewTile({...tile, quantity: 10}));
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block">
            <div className="flex items-start gap-3">
                <img
                    src="/add_cart.png"
                    alt="Add Cart"
                    className="w-auto h-12 rounded-sm object-cover"
                />
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1 p-1 border border-kiln-navy bg-[#ede1cc] px-1 font-bold text-sm leading-none text-left hover:bg-kiln-sand/30 transition-all active:scale-95 shadow w-40"
                >
                    <span className="text-lg leading-none font-bold">+</span>
                    <img
                        src="/tiles/lace.png"
                        alt="Add Cart"
                        className="w-auto h-4 mr-2 object-cover"
                    />
                    <span>ADD NEW TILE TO CART</span>
                </button>
            </div>

            {isOpen && (
                <div
                    className="absolute left-12 top-full mt-2 w-64 bg-white border-2 border-kiln-navy rounded-md shadow-xl z-50 p-2 animate-fadeIn"
                    ref={tileListRef}>
                    <p className="text-[10px] font-bold text-gray-400 p-1 uppercase border-b mb-1">
                        Select a collection to add:
                    </p>

                    {availableTo.length === 0 ? (
                        <p className="text-gray-500 p-2 text-center italic">All collections are added</p>
                    ) : (
                        <div className="flex flex-col gap-1">
                            {availableTo.map((tile) => (
                                <button
                                    key={tile.id}
                                    type="button"
                                    onClick={() => handleSelectTile(tile)}
                                    className="w-full flex items-center gap-3 p-1.5 hover:bg-kiln-sand/40 rounded text-left transition-colors"
                                >
                                    <img
                                        src={tile.image}
                                        alt={tile.name}
                                        className="w-8 h-8 rounded-sm object-cover shadow-sm bg-stone-100 group-hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-[11px] leading-tight">{tile.name}</p>
                                        <p className="text-[10px] text-kiln-terracotta font-mono">${tile.unitPrice.toFixed(2)} /
                                            sq. ft.</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};