'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeItem, updateQuantity } from '@/store/cartSlice';
import { AnimatePresence, motion } from 'framer-motion';
import { AddTileButton } from './AddTileButton';
import { clearTileFromGrid } from "@/store/designSlice";

export const CartTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, subtotal, shipping, grandTotal } = useAppSelector((state) => state.cart);

    const handleRemoveFromCart = (id: string, imagePath: string) => {
        dispatch(clearTileFromGrid(imagePath));
        dispatch(removeItem(id));
    };

    return (
        <div className="w-full text-sm">
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full text-left border-collapse border-2 border-kiln-navy">
                    <thead>
                    <tr className="bg-kiln-sand/20 text-xs font-bold tracking-wider">
                        <th className="p-1 w-[28%] text-center border border-kiln-navy">TILE COLLECTION</th>
                        <th className="p-1 w-[18%] text-center border border-kiln-navy">ITEM</th>
                        <th className="p-1 w-[18%] text-center border border-kiln-navy">QUANTITY (sq. ft.)</th>
                        <th className="p-1 w-[18%] text-center border border-kiln-navy">UNIT PRICE ($)</th>
                        <th className="p-1 w-[18%] text-center border border-kiln-navy">ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.tr
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                                transition={{ duration: 0.2 }}
                                className="hover:bg-white/40"
                            >
                                <td className="p-2 font-bold text-xs border border-kiln-navy">{item.name}</td>
                                <td className="p-2 border border-kiln-navy">
                                    <img src={item.image} alt={item.name}
                                         className="w-12 h-12 object-cover border border-kiln-navy rounded mx-auto" />
                                </td>
                                <td className="p-2 text-center border border-kiln-navy">
                                    <input
                                        type="number"
                                        value={item.quantity === 0 ? '' : item.quantity}
                                        onChange={(e) => dispatch(updateQuantity({
                                            id: item.id,
                                            quantity: Number(e.target.value)
                                        }))}
                                        className="w-16 text-center border border-kiln-navy rounded bg-transparent py-1 font-mono"
                                        min="0"
                                    />
                                </td>
                                <td className="p-2 font-mono border border-kiln-navy">${item.unitPrice.toFixed(2)}</td>
                                <td className="p-2 text-center border border-kiln-navy">
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id, item.image)}
                                        className="text-red-600 hover:text-red-800 transition-colors p-1"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
                {!items.length &&
                    <p className="text-center py-4 font-medium text-lg border-2 border-t-0 border-kiln-navy">Your Cart is Empty</p>}
            </div>
            <div className="relative flex flex-col-reverse sm:flex-row w-full justify-between items-center sm:items-start gap-6">
                <div className="w-full sm:w-max sm:absolute sm:left-0 sm:top-4 flex justify-center sm:justify-start">
                    <div className="w-full sm:w-auto">
                        <AddTileButton />
                    </div>
                </div>
                <div className="w-full grid grid-cols-[1fr_18%] gap-x-3 items-center font-mono select-none text-base">
                    <span className="font-bold text-stone-500 text-right whitespace-nowrap">SUBTOTAL:</span>
                    <div className="w-full p-2 text-center font-bold border-2 border-kiln-navy bg-white/50 h-9 flex items-center justify-center rounded-sm">
                        ${subtotal.toFixed(2)}
                    </div>
                    <span className="font-bold text-stone-500 text-right whitespace-nowrap">SHIPPING:</span>
                    <div className="w-full p-2 text-center font-bold border-2 border-kiln-navy bg-white/50 h-9 flex items-center justify-center rounded-sm">
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </div>
                    <span className="font-bold text-kiln-navy uppercase tracking-wider text-right whitespace-nowrap">GRAND TOTAL:</span>
                    <div className="w-full p-2 text-center font-bold border-2 border-kiln-navy bg-[#ede1cc] text-kiln-navy h-10 flex items-center justify-center shadow-sm rounded-sm">
                        ${grandTotal.toFixed(2)}
                    </div>

                </div>
            </div>
        </div>
    );
};