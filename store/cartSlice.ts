import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TileItem } from '@/types';

interface CartState {
    items: TileItem[];
    subtotal: number;
    shipping: number;
    grandTotal: number;
}

const calculateTotals = (items: TileItem[]) => {
    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25.00;
    return {
        subtotal,
        shipping,
        grandTotal: subtotal + shipping
    };
};

const initialState: CartState = {
    items: [],
    subtotal: 0,
    shipping: 0,
    grandTotal: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity = Math.max(0, action.payload.quantity);
            }
            Object.assign(state, calculateTotals(state.items));
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            Object.assign(state, calculateTotals(state.items));
        },
        addNewTile: (state, action: PayloadAction<TileItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += Number(action.payload.quantity);
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: Number(action.payload.quantity),
                    unitPrice: Number(action.payload.unitPrice)
                });
            }

            Object.assign(state, calculateTotals(state.items));
        }
    }
});

export const { updateQuantity, removeItem, addNewTile } = cartSlice.actions;
export default cartSlice.reducer;