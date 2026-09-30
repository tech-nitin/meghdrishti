"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, MapPin, Check, ChevronRight } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import { mockLocations } from "@/data/locations";
import type { GeoLocation } from "@/types/location";

export function LocationModal() {
  const { locationModalOpen, setLocationModalOpen, currentLocation, setCurrentLocation } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  if (!locationModalOpen) return null;

  const filteredLocations = mockLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loc.block && loc.block.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelect = (loc: GeoLocation) => {
    setCurrentLocation(loc);
    setLocationModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLocationModalOpen(false)}
          className="fixed inset-0 bg-[#18372A]/40 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-[#FAF8F2] border border-[#DCCDB5] rounded-2xl shadow-xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCCDB5] bg-[#F5F2E9]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8EEE5] flex items-center justify-center text-[#315C3F]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#20312C]">Select Intelligence Location</h3>
                <p className="text-xs text-[#60716B]">Block & Panchayat level climate feeds</p>
              </div>
            </div>
            <button
              onClick={() => setLocationModalOpen(false)}
              className="p-1.5 text-[#60716B] hover:text-[#20312C] hover:bg-[#E8EEE5] rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search bar */}
          <div className="p-4 border-b border-[#DCCDB5]/60 bg-white">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#60716B]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search state, district, or block (e.g. Shajapur, MP)..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#FAF8F2] border border-[#DCCDB5] rounded-xl text-[#20312C] placeholder-[#60716B] focus:outline-none focus:border-[#315C3F] focus:ring-1 focus:ring-[#315C3F]"
                autoFocus
              />
            </div>
          </div>

          {/* Locations list */}
          <div className="max-h-80 overflow-y-auto p-4 space-y-2">
            <div className="text-[11px] font-semibold text-[#60716B] tracking-wider uppercase px-2 mb-1">
              Available Agro-Climatic Clusters
            </div>
            {filteredLocations.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#60716B]">
                No matching location found.
              </div>
            ) : (
              filteredLocations.map((loc) => {
                const isSelected = loc.id === currentLocation.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#E8EEE5] border-[#315C3F] text-[#18372A]"
                        : "bg-white border-[#DCCDB5]/70 hover:border-[#789B7C] hover:bg-[#FAF8F2] text-[#20312C]"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{loc.name}</span>
                        {loc.riskLevel && (
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${
                              loc.riskLevel === "low"
                                ? "bg-[#E8EEE5] text-[#315C3F]"
                                : loc.riskLevel === "moderate"
                                ? "bg-[#D39A3D]/15 text-[#D39A3D]"
                                : "bg-[#C85B4F]/15 text-[#C85B4F]"
                            }`}
                          >
                            {loc.riskLevel} Risk
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#60716B]">
                        {loc.district}, {loc.state} {loc.panchayat ? `• Panchayat: ${loc.panchayat}` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#315C3F] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#60716B]" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-[#F5F2E9] border-t border-[#DCCDB5] text-[11px] text-[#60716B] flex items-center justify-between">
            <span>Prototype Default: Madhya Pradesh → Shajapur Block</span>
            <span className="text-[#315C3F] font-medium">Resolution: 1.5 km²</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
