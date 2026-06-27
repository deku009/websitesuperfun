"use client";

import { Info } from "lucide-react";

interface AstrologyResultsProps {
  data: any;
}

export default function AstrologyResults({ data }: AstrologyResultsProps) {
  const { name, numerology, astrology, interpretation } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Numerology for {name}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-800 font-semibold">Mulank (Birth Number)</span>
              <span className="text-3xl font-bold text-amber-600">{numerology.mulank.number}</span>
            </div>
            <p className="text-sm text-gray-600 italic">{numerology.mulank.trait}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-800 font-semibold">Bhagyank (Destiny Number)</span>
              <span className="text-3xl font-bold text-amber-600">{numerology.bhagyank.number}</span>
            </div>
            <p className="text-sm text-gray-600 italic">{numerology.bhagyank.trait}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
            Janam Kundli (Birth Chart)
          </h3>
          <div 
            className="w-full aspect-square"
            dangerouslySetInnerHTML={{ __html: astrology.chartSvg }}
          />
          <div className="mt-4 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-3 rounded">
            <Info className="h-4 w-4 flex-shrink-0" />
            <p>This is a North Indian style diamond grid chart. Numbers represent Rashis (Zodiac signs), and blue text represents planetary placements.</p>
          </div>
        </div>

        <div className="prose prose-amber max-w-none bg-white p-6 rounded-xl shadow-lg border border-amber-200">
          <h3 className="text-xl font-bold text-amber-900 mb-4">AI Cosmic Insights</h3>
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {interpretation}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200 overflow-x-auto">
        <h3 className="text-xl font-bold text-amber-900 mb-4">Planetary Positions</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-amber-100 text-amber-800">
              <th className="py-2">Planet</th>
              <th className="py-2">Rashi</th>
              <th className="py-2">Degree</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(astrology.planets).map(([planet, details]: [string, any]) => (
              <tr key={planet} className="border-b border-amber-50 hover:bg-amber-50 transition-colors">
                <td className="py-2 font-medium">{planet}</td>
                <td className="py-2">{details.rashiName}</td>
                <td className="py-2">{details.degree.toFixed(2)}°</td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${details.isRetrograde ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {details.isRetrograde ? 'Retrograde' : 'Direct'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
