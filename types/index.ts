export interface TileItem {
    id: string;
    name: string;
    image: string;
    patternImage: string;
    quantity: number;
    unitPrice: number;
}

export type PaymentMethod = 'credit-card' | 'paypal' | 'apple-pay' | 'bank-transfer';

export interface CheckoutFormValues {
    customerName: string;
    phone: string;
    email: string;
    shippingAddress: string;
    projectNotes: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    paymentMethod: PaymentMethod;
}