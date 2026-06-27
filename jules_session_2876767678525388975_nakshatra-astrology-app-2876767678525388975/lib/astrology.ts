import { getKundli, Observer } from '@ishubhamx/panchangam-js';

export interface AstrologyData {
  kundli: any;
  chartSvg: string;
}

/**
 * Renders a simple SVG for a North Indian style Kundli.
 * Since @ishubhamx/panchangam-js doesn't provide SVG, we implement a basic one.
 */
function renderNorthIndianChart(houses: any[]): string {
  // Houses 1-12 in North Indian style diamond grid
  // This is a simplified version.
  const rashiNames = houses.map(h => h.rashi);
  
  // Basic diamond grid SVG
  return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto bg-white border border-amber-200">
      <!-- Outer Frame -->
      <line x1="0" y1="0" x2="400" y2="400" stroke="#b45309" stroke-width="2" />
      <line x1="400" y1="0" x2="0" y2="400" stroke="#b45309" stroke-width="2" />
      <rect x="0" y="0" width="400" height="400" fill="none" stroke="#b45309" stroke-width="4" />
      
      <!-- Inner Diamond -->
      <line x1="200" y1="0" x2="400" y2="200" stroke="#b45309" stroke-width="2" />
      <line x1="400" y1="200" x2="200" y2="400" stroke="#b45309" stroke-width="2" />
      <line x1="200" y1="400" x2="0" y2="200" stroke="#b45309" stroke-width="2" />
      <line x1="0" y1="200" x2="200" y2="0" stroke="#b45309" stroke-width="2" />
      
      <!-- House Numbers (Rashi) -->
      <text x="200" y="160" text-anchor="middle" font-size="20" fill="#92400e" font-weight="bold">${rashiNames[0]}</text>
      <text x="130" y="90" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[1]}</text>
      <text x="60" y="160" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[2]}</text>
      <text x="130" y="230" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[3]}</text>
      <text x="60" y="300" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[4]}</text>
      <text x="130" y="370" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[5]}</text>
      <text x="200" y="300" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[6]}</text>
      <text x="270" y="370" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[7]}</text>
      <text x="340" y="300" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[8]}</text>
      <text x="270" y="230" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[9]}</text>
      <text x="340" y="160" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[10]}</text>
      <text x="270" y="90" text-anchor="middle" font-size="20" fill="#92400e">${rashiNames[11]}</text>
      
      <!-- Planets in Houses -->
      <text x="200" y="120" text-anchor="middle" font-size="12" fill="#1e40af">${houses[0].planets.join(' ')}</text>
      <text x="100" y="70" text-anchor="middle" font-size="12" fill="#1e40af">${houses[1].planets.join(' ')}</text>
      <text x="40" y="130" text-anchor="middle" font-size="12" fill="#1e40af">${houses[2].planets.join(' ')}</text>
      <text x="100" y="200" text-anchor="middle" font-size="12" fill="#1e40af">${houses[3].planets.join(' ')}</text>
      <text x="40" y="270" text-anchor="middle" font-size="12" fill="#1e40af">${houses[4].planets.join(' ')}</text>
      <text x="100" y="340" text-anchor="middle" font-size="12" fill="#1e40af">${houses[5].planets.join(' ')}</text>
      <text x="200" y="270" text-anchor="middle" font-size="12" fill="#1e40af">${houses[6].planets.join(' ')}</text>
      <text x="300" y="340" text-anchor="middle" font-size="12" fill="#1e40af">${houses[7].planets.join(' ')}</text>
      <text x="360" y="270" text-anchor="middle" font-size="12" fill="#1e40af">${houses[8].planets.join(' ')}</text>
      <text x="300" y="200" text-anchor="middle" font-size="12" fill="#1e40af">${houses[9].planets.join(' ')}</text>
      <text x="360" y="130" text-anchor="middle" font-size="12" fill="#1e40af">${houses[10].planets.join(' ')}</text>
      <text x="300" y="70" text-anchor="middle" font-size="12" fill="#1e40af">${houses[11].planets.join(' ')}</text>
    </svg>
  `;
}

export function calculateAstrology(date: Date, lat: number, lng: number): AstrologyData {
  try {
    const observer = new Observer(lat, lng, 0);
    const kundli = getKundli(date, observer);
    
    const chartSvg = renderNorthIndianChart(kundli.houses);

    return {
      kundli,
      chartSvg: chartSvg
    };
  } catch (error) {
    console.error("Error calculating astrology:", error);
    throw error;
  }
}
