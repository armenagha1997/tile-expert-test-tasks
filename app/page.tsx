'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { CartTable } from '@/components/cart/CartTable';
import { DesignGrid } from '@/components/design-tool/DesignGrid';
import { Palette } from '@/components/design-tool/Palette';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
      <main className="min-h-screen bg-kiln-bg text-kiln-navy font-sans flex flex-col justify-between">
         <div className="flex-grow w-full">
          <Header />
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col xl:flex-row items-start justify-between w-full mt-4">
            <section className="w-full xl:w-[37%] sm:p-4 flex flex-col sm:mr-4">
              <h2 className="text-xl font-bold mb-4 pb-2 tracking-wide uppercase">
                Shopping Cart & Design Tool
              </h2>
              <CartTable />
            </section>
            <section className="hidden xl:flex xl:w-[37%] flex-col bg-[#ede1cc]">
              <div className="flex justify-between items-stretch">
                <div className="w-[72%] border-2 border-kiln-navy">
                  <DesignGrid />
                </div>
                <div className="w-[28%] border-y-2 border-kiln-navy">
                  <Palette />
                </div>
              </div>
            </section>
            <section className="w-full xl:w-[26%] bg-[#ede1cc] p-4 border-2 border-kiln-navy flex flex-col shadow-sm">
              <h2 className="text-xl font-bold mb-4 border-b pb-2 tracking-wide uppercase">
                Order Summary
              </h2>
              <CheckoutForm />
            </section>

          </div>
        </div>
        <Footer />
      </main>
  );
}