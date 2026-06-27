"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BirthDetailsFormProps {
  onAnalyze: (data: any) => void;
  isLoading: boolean;
}

export default function BirthDetailsForm({ onAnalyze, isLoading }: BirthDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    tob: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-amber-100">
      <div>
        <label className="block text-sm font-medium text-amber-900 mb-1">Full Name</label>
        <input
          required
          type="text"
          className="w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Date of Birth</label>
          <input
            required
            type="date"
            className="w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Time of Birth</label>
          <input
            required
            type="time"
            className="w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
            value={formData.tob}
            onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-amber-900 mb-1">Area of Birth</label>
        <input
          required
          type="text"
          className="w-full p-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500 outline-none"
          placeholder="City, State, Country"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Analyzing Stars...
          </>
        ) : (
          "Calculate Nakshatra"
        )}
      </button>
    </form>
  );
}
