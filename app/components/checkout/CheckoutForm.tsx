'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppSelector } from '@/store/hooks';
import { PaymentMethod } from '@/types';

const checkoutSchema = z.object({
    customerName: z.string().min(2, 'Name is too short (minimum 2 characters)'),
    phone: z.string().min(5, 'Invalid phone number format'),
    email: z.string().email('Invalid email address'),
    shippingAddress: z.string().min(10, 'Please enter a full shipping address'),
    projectNotes: z.string().optional(),
    paymentMethod: z.enum(['credit-card', 'paypal', 'apple-pay', 'bank-transfer'] as const),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.paymentMethod === 'credit-card') {
        if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber.replace(/\s/g, ''))) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Номер карты должен состоять из 16 цифр',
                path: ['cardNumber'],
            });
        }
        if (!data.expiry || !/^\d{2}\/\d{2}$/.test(data.expiry)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Формат срока действия должен быть ММ/ГГ',
                path: ['expiry'],
            });
        }
        if (!data.cvv || !/^\d{3}$/.test(data.cvv)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'CVV должен состоять из 3 цифр',
                path: ['cvv'],
            });
        }
    }
});

type CheckoutFormInputs = z.infer<typeof checkoutSchema>;

export const CheckoutForm: React.FC = () => {
    const { grandTotal } = useAppSelector((state) => state.cart);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormInputs>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: 'credit-card',
        },
    });

    const currentPaymentMethod = watch('paymentMethod');

    const onSubmit = async (data: CheckoutFormInputs) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert(`Заказ успешно оформлен! Итого к оплате: $${grandTotal.toFixed(2)}\nСпособ оплаты: ${data.paymentMethod}`);
        console.log('Order Data Submitted:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
            <div className="space-y-2">
                <div>
                    <label className="block font-bold mb-1">CUSTOMER NAME *</label>
                    <input
                        {...register('customerName')}
                        className="w-full border-b-2 border-kiln-navy bg-transparent py-1 focus:outline-none focus:border-kiln-terracotta transition-colors"
                    />
                    {errors.customerName && <p className="text-red-500 mt-0.5">{errors.customerName.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-bold mb-1">PHONE *</label>
                        <input
                            {...register('phone')}
                            className="w-full border-b-2 border-kiln-navy bg-transparent py-1 focus:outline-none"
                        />
                        {errors.phone && <p className="text-red-500 mt-0.5">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label className="block font-bold mb-1">EMAIL *</label>
                        <input
                            {...register('email')}
                            className="w-full border-b-2 border-kiln-navy bg-transparent py-1 focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 mt-0.5">{errors.email.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block font-bold mb-1">SHIPPING ADDRESS *</label>
                    <input
                        {...register('shippingAddress')}
                        className="w-full border-b-2 border-kiln-navy bg-transparent py-1 focus:outline-none"
                    />
                    {errors.shippingAddress && <p className="text-red-500 mt-0.5">{errors.shippingAddress.message}</p>}
                </div>

                <div>
                    <label className="block font-bold mb-1">PROJECT NOTES</label>
                    <textarea
                        {...register('projectNotes')}
                        rows={2}
                        className="w-full border border-kiln-navy rounded bg-transparent p-1 focus:outline-none"
                    />
                </div>
            </div>
            <hr className="border-kiln-sand my-4" />
            <div>
                <label className="block font-bold mb-2 tracking-wider">SELECT PAYMENT METHOD:</label>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: 'credit-card', label: 'CREDIT/DEBIT CARD', icon: '💳' },
                        { id: 'paypal', label: 'PAYPAL', icon: '🅿️' },
                        { id: 'apple-pay', label: 'APPLE PAY', icon: '🍏' },
                        { id: 'bank-transfer', label: 'BANK TRANSFER', icon: '🏦' },
                    ].map((method) => (
                        <label
                            key={method.id}
                            className={`flex items-center gap-2 p-2 border rounded cursor-pointer transition-all ${
                                currentPaymentMethod === method.id
                                    ? 'border-kiln-navy bg-kiln-sand/40 font-bold'
                                    : 'border-gray-300 bg-white/30'
                            }`}
                        >
                            <input
                                type="radio"
                                value={method.id}
                                checked={currentPaymentMethod === method.id}
                                onChange={() => setValue('paymentMethod', method.id as PaymentMethod)}
                                className="accent-kiln-navy"
                            />
                            <span>{method.icon}</span>
                            <span className="text-[10px] leading-tight">{method.label}</span>
                        </label>
                    ))}
                </div>
            </div>
            {currentPaymentMethod === 'credit-card' && (
                <div className="p-3 bg-kiln-sand/20 border border-kiln-navy rounded space-y-2 mt-2">
                    <div>
                        <label className="block text-[10px] font-bold mb-0.5">CARD NUMBER</label>
                        <input
                            {...register('cardNumber')}
                            placeholder="1234 4556 7723 8990"
                            maxLength={19}
                            className="w-full border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-[10px] mt-0.5">{errors.cardNumber.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-[10px] font-bold mb-0.5">EXPIRATION</label>
                            <input
                                {...register('expiry')}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-center focus:outline-none"
                            />
                            {errors.expiry && <p className="text-red-500 text-[10px] mt-0.5">{errors.expiry.message}</p>}
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold mb-0.5">CVV</label>
                            <input
                                {...register('cvv')}
                                type="password"
                                placeholder="123"
                                maxLength={3}
                                className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-center focus:outline-none"
                            />
                            {errors.cvv && <p className="text-red-500 text-[10px] mt-0.5">{errors.cvv.message}</p>}
                        </div>
                    </div>
                </div>
            )}
            <button
                type="submit"
                disabled={isSubmitting || grandTotal === 0}
                className="w-full mt-4 bg-kiln-navy text-white py-3 rounded-md font-bold tracking-widest uppercase shadow hover:bg-kiln-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'PROCESSING...' : 'PLACE SECURE ORDER'}
            </button>
        </form>
    );
};