"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import OrderSummary from "@/components/checkout/OrderSummary";
import { AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const nextStep = () => setStep((prev) => prev + 1);

    const handleShippingComplete = () => nextStep();

    const handlePaymentComplete = () => {
        setIsConfirmed(true);
        setStep(3);
    };

    return (
        <div className="bg-luxury-black min-h-screen pt-28 pb-20">
            <Container>
                {!isConfirmed && (
                    <CheckoutSteps currentStep={step} />
                )}

                {isConfirmed ? (
                    <OrderConfirmation />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                        {/* Main Content Area */}
                        <div className="flex-1 w-full">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <ShippingForm key="shipping" onComplete={handleShippingComplete} />
                                )}
                                {step === 2 && (
                                    <PaymentForm key="payment" onComplete={handlePaymentComplete} />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sidebar Sticky */}
                        <div className="w-full lg:w-[380px]">
                            <OrderSummary />
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}
