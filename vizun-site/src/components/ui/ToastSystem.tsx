"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
    id: string;
    message: string;
    type: ToastType;
};

type ToastContextType = {
    toast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = (message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ toast, onDismiss }: { toast: Toast, onDismiss: () => void }) => {
    const icons = {
        success: CheckCircle2,
        error: AlertCircle,
        warning: AlertCircle,
        info: Info
    };

    const colors = {
        success: "border-l-green-500",
        error: "border-l-red-500",
        warning: "border-l-yellow-500",
        info: "border-l-blue-500"
    };

    const Icon = icons[toast.type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            layout
            className={cn(
                "pointer-events-auto bg-[#1C1C1C] text-white p-4 rounded shadow-2xl border-l-[4px] flex items-start gap-3 relative overflow-hidden",
                colors[toast.type]
            )}
        >
            <Icon className="w-5 h-5 shrink-0 mt-0.5 opacity-90" />
            <div className="flex-1 pr-6">
                <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
                onClick={onDismiss}
                className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-4 h-4" />
            </button>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={cn(
                    "absolute bottom-0 left-0 h-0.5",
                    toast.type === "success" ? "bg-green-500" :
                        toast.type === "error" ? "bg-red-500" :
                            toast.type === "warning" ? "bg-yellow-500" : "bg-blue-500"
                )}
            />
        </motion.div>
    );
};
