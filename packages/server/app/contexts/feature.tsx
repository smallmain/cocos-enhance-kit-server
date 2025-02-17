"use client";

import { Icon } from "@/components/icon";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface Feature {
    name: string;
    url: string;
    icon: Icon;
    isActive: boolean;
}

interface FeatureContextType {
    currentFeature: Feature;
    setCurrentFeature: (feature: Feature) => void;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export function FeatureProvider({
    children,
    initialFeature,
}: {
    children: ReactNode;
    initialFeature: Feature;
}) {
    const [currentFeature, setCurrentFeature] = useState(initialFeature);

    return (
        <FeatureContext.Provider value={{ currentFeature, setCurrentFeature }}>
            {children}
        </FeatureContext.Provider>
    );
}

export function useFeature() {
    const context = useContext(FeatureContext);
    if (!context) {
        throw new Error("useFeature must be used within a FeatureProvider");
    }
    return context;
}
