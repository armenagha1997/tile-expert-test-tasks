import React from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {placeTile} from '@/store/designSlice';

export const DesignGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const grid = useAppSelector((state) => state.design.grid);
    const cartItems = useAppSelector((state) => state.cart.items);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, row: number, col: number) => {
        e.preventDefault();
        const tileImage = e.dataTransfer.getData('text/plain');

        if (tileImage) {
            const cartItem = cartItems.find(item => item.patternImage === tileImage || item.image === tileImage);
            const maxLimit = cartItem ? cartItem.quantity : 0;

            dispatch(placeTile({
                row,
                col,
                tileImage,
                maxLimit
            }));
        }
    };

    const handleGridDragStart = (e: React.DragEvent, row: number, col: number, tileImage: string) => {
        e.dataTransfer.setData('text/plain', tileImage);
        setTimeout(() => {
            dispatch(placeTile({row, col, tileImage: null}));
        }, 0);
    };

    const handleCellClick = (row: number, col: number, isOccupied: boolean) => {
        if (isOccupied) {
            dispatch(placeTile({row, col, tileImage: null}));
        }
    };

    return (
        <div className="w-full overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-kiln-navy/20">
            <h2 className="text-xl font-bold mb-1 text-center uppercase tracking-wide">
                Visualize Your Order
            </h2>
            <p className="text-xs text-center text-gray-500 mb-4">
                Drag and drop tiles here to create patterns.
            </p>
            <div className="w-full overflow-x-auto pb-2 scrollbar-thin border-y-2 border-kiln-navy">
                <div
                    className="grid grid-cols-8 grid-rows-8 gap-[2px] p-2 bg-kiln-sand/40 min-w-[410px] sm:min-w-[480px] md:min-w-[540px] max-w-max mx-auto"
                >
                    {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            const hasTile = !!cell;

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                                    onClick={() => handleCellClick(rowIndex, colIndex, hasTile)}
                                    className={`
                        relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 overflow-hidden transition-all duration-200 cursor-pointer select-none
                        ${hasTile
                                        ? 'bg-transparent shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] rounded-[2px] hover:brightness-90'
                                        : 'bg-[#F4EFE6]/60 hover:bg-kiln-sand/50 border border-dashed border-kiln-sand flex items-center justify-center'
                                    }
                    `}
                                >
                                    {hasTile ? (
                                        <img
                                            src={cell}
                                            alt="Placed tile"
                                            draggable={true}
                                            onDragStart={(e) => handleGridDragStart(e, rowIndex, colIndex, cell)}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span
                                            className="text-[14px] font-light text-kiln-navy/30 pointer-events-none">+</span>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};