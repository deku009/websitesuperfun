"use client";

import { useState } from "react";
import BirthDetailsForm from "@/components/BirthDetailsForm";
import AstrologyResults from "@/components/AstrologyResults";
import { Stars } from "lucide-react";

export default function Home() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to analyze data");
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffdf5] text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Stars className="h-10 w-10 text-amber-600" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-amber-900 mb-2 tracking-tight">
            Nakshatra
          </h1>
          <p className="text-lg text-amber-700 italic">
            "Your Destiny, Written in the Stars"
          </p>
        </header>

        <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
          <div className="sticky top-8">
            <BirthDetailsForm onAnalyze={handleAnalyze} isLoading={loading} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {!analysisData && !loading && (
              <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100 text-amber-900">
                <h3 className="font-bold mb-2">Discover Your:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">✨ Mulank & Bhagyank</li>
                  <li className="flex items-center gap-2">✨ Personalized Kundli</li>
                  <li className="flex items-center gap-2">✨ Love & Career Insights</li>
                  <li className="flex items-center gap-2">✨ Success Guidance</li>
                </ul>
              </div>
            )}
          </div>

          <div className="min-h-[600px]">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <Stars className="h-16 w-16 text-amber-300 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <p className="text-amber-800 font-medium animate-pulse">Consulting the Cosmic Alignment...</p>
              </div>
            ) : analysisData ? (
              <AstrologyResults data={analysisData} />
            ) : (
              <div className="h-full border-2 border-dashed border-amber-200 rounded-2xl flex flex-col items-center justify-center text-amber-300 p-12 text-center">
                <Stars className="h-24 w-24 mb-4 opacity-20" />
                <h3 className="text-2xl font-semibold opacity-40">Enter your birth details to reveal your celestial map</h3>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-amber-100 text-center text-amber-800 text-sm opacity-60">
          © {new Date().getFullYear()} Nakshatra Astrology App. All cosmic rights reserved.
        </footer>
      </div>
    </main>
  );
}
