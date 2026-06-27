import { NextRequest, NextResponse } from "next/server";
import { calculateMulank, calculateBhagyank, getNumerologyInterpretation } from "@/lib/numerology";
import { geocode } from "@/lib/geocoding";
import { calculateAstrology } from "@/lib/astrology";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "mock_key",
});

export async function POST(req: NextRequest) {
  try {
    const { name, dob, tob, location } = await req.json();

    if (!name || !dob || !tob || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const birthDate = new Date(`${dob}T${tob}`);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    // 1. Numerology
    const mulank = calculateMulank(day);
    const bhagyank = calculateBhagyank(day, month, year);
    const numerology = getNumerologyInterpretation(mulank, bhagyank);

    // 2. Geocoding
    const geo = await geocode(location);
    if (!geo) {
      return NextResponse.json({ error: "Could not find birth location" }, { status: 400 });
    }

    // 3. Astrology
    const astrology = calculateAstrology(birthDate, geo.lat, geo.lng);

    // 4. AI Interpretation
    let interpretation = "";
    if (process.env.ANTHROPIC_API_KEY) {
      const prompt = `
        You are an expert Vedic Astrologer. Analyze the following details for ${name}:
        - Date of Birth: ${dob}
        - Time of Birth: ${tob}
        - Location: ${location}
        - Mulank: ${mulank}
        - Bhagyank: ${bhagyank}
        - Planetary Positions (House-wise): ${JSON.stringify(astrology.kundli.houses.map((h: any) => ({ house: h.number, rashi: h.rashi, planets: h.planets })))}
        
        Provide a detailed interpretation for:
        1. General Personality (based on Mulank & Bhagyank)
        2. Love Life & Relationships
        3. Career & Wealth
        4. Success & Life Path
        5. Any specific astrological advice.
        
        Keep it professional, insightful, and positive. Format the response in clear sections.
      `;

      const msg = await anthropic.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      });
      
      const content = msg.content[0];
      if ('text' in content) {
        interpretation = content.text;
      }
    } else {
      interpretation = `
## Astrology Analysis for ${name}

**Personality (Mulank ${mulank}, Bhagyank ${bhagyank})**
As a Mulank ${mulank}, you possess ${numerology.mulank.trait}. Your Bhagyank ${bhagyank} suggests a destiny path of ${numerology.bhagyank.trait}. This combination indicates a strong personality with a clear sense of purpose.

**Love Life & Relationships**
With your planetary placements, you value emotional connection and stability. Expect significant growth in your personal relationships as you learn to balance your independent nature with the needs of your partner.

**Career & Wealth**
Your charts suggest a strong potential for success in fields requiring discipline and original thinking. Financial stability will come through steady effort and wise management of resources.

**Success & Life Path**
You are on a path of self-discovery and achievement. By aligning your actions with your natural vibrations (numbers ${mulank} and ${bhagyank}), you will find fulfillment and overcome obstacles with grace.

**Astrological Advice**
Meditate on your strengths and maintain a positive outlook. The current alignment of planets suggests that this is an auspicious time for starting new ventures.

*(Note: This is a simulated response because the Claude API key is not configured.)*
      `;
    }

    return NextResponse.json({
      name,
      numerology,
      astrology: {
        chartSvg: astrology.chartSvg,
        planets: astrology.kundli.planets,
        houses: astrology.kundli.houses,
      },
      interpretation,
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze data" }, { status: 500 });
  }
}
