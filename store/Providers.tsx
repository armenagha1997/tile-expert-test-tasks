'use client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import designReducer from './designSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        design: designReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}