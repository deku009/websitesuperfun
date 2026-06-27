/**
 * Calculates the single digit sum of a number.
 * If the sum is more than 9, it continues adding digits until a single digit is obtained.
 */
export function getSingleDigit(num: number): number {
  if (num === 0) return 0;
  let sum = num;
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return sum;
}

/**
 * Calculates Mulank (Birth Number)
 * Mulank is calculated from the date of birth only.
 * e.g., if born on 14th, Mulank = 1 + 4 = 5.
 */
export function calculateMulank(day: number): number {
  return getSingleDigit(day);
}

/**
 * Calculates Bhagyank (Destiny Number)
 * Bhagyank is calculated from the full date of birth (day + month + year).
 * e.g., 14 August 1995 -> 1 + 4 + 8 + 1 + 9 + 9 + 5 = 37 -> 3 + 7 = 10 -> 1 + 0 = 1.
 */
export function calculateBhagyank(day: number, month: number, year: number): number {
  const sum = day + month + year;
  // Actually, standard numerology adds all digits individually
  const allDigits = (day.toString() + month.toString() + year.toString())
    .split("")
    .map(Number)
    .reduce((a, b) => a + b, 0);
  
  return getSingleDigit(allDigits);
}

export function getNumerologyInterpretation(mulank: number, bhagyank: number) {
  // Brief interpretations for UI
  const interpretations: Record<number, string> = {
    1: "Leadership, Independence, Ambition",
    2: "Cooperation, Sensitivity, Balance",
    3: "Expression, Creativity, Optimism",
    4: "Stability, Discipline, Practicality",
    5: "Freedom, Versatility, Change",
    6: "Harmony, Responsibility, Nurturing",
    7: "Analysis, Spirituality, Introspection",
    8: "Authority, Material Success, Karma",
    9: "Humanitarianism, Compassion, Completion",
  };

  return {
    mulank: {
      number: mulank,
      trait: interpretations[mulank] || "",
    },
    bhagyank: {
      number: bhagyank,
      trait: interpretations[bhagyank] || "",
    },
  };
}
