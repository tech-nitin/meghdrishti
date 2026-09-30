"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GeoLocation } from "@/types/location";
import { defaultLocation, mockLocations } from "@/data/locations";

export type Language = "en" | "hi";

interface AppContextType {
  currentLocation: GeoLocation;
  setCurrentLocation: (loc: GeoLocation) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  farmerMode: boolean;
  setFarmerMode: (enabled: boolean) => void;
  toggleFarmerMode: () => void;
  selectedPhase: "active" | "break" | "revival";
  setSelectedPhase: (phase: "active" | "break" | "revival") => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  locationModalOpen: boolean;
  setLocationModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<GeoLocation>(defaultLocation);
  const [language, setLanguage] = useState<Language>("en");
  const [farmerMode, setFarmerMode] = useState<boolean>(false);
  const [selectedPhase, setSelectedPhase] = useState<"active" | "break" | "revival">("active");
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [locationModalOpen, setLocationModalOpen] = useState<boolean>(false);

  const toggleFarmerMode = () => {
    setFarmerMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        language,
        setLanguage,
        farmerMode,
        setFarmerMode,
        toggleFarmerMode,
        selectedPhase,
        setSelectedPhase,
        notificationsOpen,
        setNotificationsOpen,
        locationModalOpen,
        setLocationModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
