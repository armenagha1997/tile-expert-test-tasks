import { TileItem } from '@/types';

// 1. Импортируем картинки как обычные модули
import lace from '@/public/tiles/lace.png';
import moroccan from '@/public/tiles/moroccan.png';
import sage from '@/public/tiles/sage.png';
import terracotta from '@/public/tiles/terracotta.png';
import navy from '@/public/tiles/navy.png';
import amalfi from '@/public/tiles/amalfi.png';
import artisan from '@/public/tiles/artisan.png';
import geometric from '@/public/tiles/geometric.png';
import flora from '@/public/tiles/flora.png';
import golden from '@/public/tiles/golden.png';

// 2. Передаем импортированные объекты в свойства image и patternImage
export const AVAILABLE_EXTRA_TILES: TileItem[] = [
    { id: '1', name: 'MEDITERRANEAN LACE', image: lace.src, patternImage: lace.src, quantity: 0, unitPrice: 32.00 },
    { id: '2', name: 'MOROCCAN STAR', image: moroccan.src, patternImage: moroccan.src, quantity: 0, unitPrice: 35.00 },
    { id: '3', name: 'SAGE HERRINGBONE', image: sage.src, patternImage: sage.src, quantity: 0, unitPrice: 27.00 },
    { id: '4', name: 'TERRACOTTA ARCHES', image: terracotta.src, patternImage: terracotta.src, quantity: 0, unitPrice: 22.00 },
    { id: '5', name: 'NAVY ORBITS', image: navy.src, patternImage: navy.src, quantity: 0, unitPrice: 24.00 },
    { id: '6', name: 'AMALFI DOVES', image: amalfi.src, patternImage: amalfi.src, quantity: 0, unitPrice: 20.00 },
    { id: '7', name: 'ARTISAN FLORA', image: artisan.src, patternImage: artisan.src, quantity: 0, unitPrice: 34.00 },
    { id: '8', name: 'GEOMETRIC KILN', image: geometric.src, patternImage: geometric.src, quantity: 0, unitPrice: 30.00 },
    { id: '9', name: 'VINTAGE FLORA', image: flora.src, patternImage: flora.src, quantity: 0, unitPrice: 36.00 },
    { id: '10', name: 'GOLDEN HERRINGBONE', image: golden.src, patternImage: golden.src, quantity: 0, unitPrice: 26.00 }
];