import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeItem} from "@/store/cartSlice";
import {AVAILABLE_EXTRA_TILES} from "@/constants/tiles";

interface HistoryItem {
    row: number;
    col: number;
    tileImage: string;
}

interface DesignState {
    grid: (string | null)[][];
    history: HistoryItem[];
}

const initialState: DesignState = {
    grid: Array(8).fill(null).map(() => Array(8).fill(null)),
    history: []
};

const designSlice = createSlice({
    name: 'design',
    initialState,
    reducers: {
        placeTile: (state, action: PayloadAction<{
            row: number;
            col: number;
            tileImage: string | null;
            maxLimit?: number
        }>) => {
            const {row, col, tileImage, maxLimit} = action.payload;
            const oldTile = state.grid[row][col];

            if (tileImage === null) {
                state.grid[row][col] = null;
                state.history = state.history.filter(h => !(h.row === row && h.col === col));
                return;
            }

            if (typeof maxLimit === 'number') {
                const currentCount = state.grid.flat().filter((cell, index) => {
                    const r = Math.floor(index / 8);
                    const c = index % 8;
                    if (r === row && c === col) return false;
                    return cell === tileImage;
                }).length;

                if (currentCount >= maxLimit && maxLimit > 0) {
                    const oldestIndex = state.history.findIndex(h => h.tileImage === tileImage);
                    if (oldestIndex !== -1) {
                        const oldest = state.history[oldestIndex];
                        state.grid[oldest.row][oldest.col] = null;
                        state.history.splice(oldestIndex, 1);
                    }
                }
            }

            if (oldTile && oldTile !== tileImage) {
                state.history = state.history.filter(h => !(h.row === row && h.col === col));
            }

            state.grid[row][col] = tileImage;

            state.history.push({row, col, tileImage});
        },
        clearCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
            const {row, col} = action.payload;
            state.grid[row][col] = null;
        },
        clearTileFromGrid: (state, action: PayloadAction<string>) => {
            state.grid = state.grid.map(row =>
                row.map(cell => cell === action.payload ? null : cell)
            );
        }
    },
    extraReducers: (builder) => {
        builder.addCase(removeItem, (state, action) => {
            const tile = AVAILABLE_EXTRA_TILES.find(t => t.id === action.payload);
            const targetImage = tile ? tile.patternImage : null;

            if (targetImage) {
                state.grid = state.grid.map(row =>
                    row.map(cell => cell === targetImage ? null : cell)
                );
                state.history = state.history.filter(h => h.tileImage !== targetImage);
            }
        });
    }
});

export const {placeTile, clearCell, clearTileFromGrid} = designSlice.actions;
export default designSlice.reducer;