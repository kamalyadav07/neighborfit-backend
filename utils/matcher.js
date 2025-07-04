// Normalize a value between 0 and 1
const normalize = (value, min, max, inverse = false) => {
  const norm = (value - min) / (max - min);
  return inverse ? 1 - norm : norm;
};

function calculateMatchScores(userPrefs, neighborhoods) {
  const allValues = {
    affordability: neighborhoods.map(n => n.affordability),
    transit: neighborhoods.map(n => n.transit),
    proximity: neighborhoods.map(n => n.proximity),
    lifestyle: neighborhoods.map(n => n.lifestyle),
    safety: neighborhoods.map(n => n.safety),
  };

  const minMax = {};
  for (let key in allValues) {
    minMax[key] = {
      min: Math.min(...allValues[key]),
      max: Math.max(...allValues[key]),
    };
  }

  return neighborhoods.map(n => {
    const scores = {
      affordability: normalize(n.affordability, minMax.affordability.min, minMax.affordability.max, true),
      transit:      normalize(n.transit,      minMax.transit.min,      minMax.transit.max),
      proximity:    normalize(n.proximity,    minMax.proximity.min,    minMax.proximity.max, true),
      lifestyle:    normalize(n.lifestyle,    minMax.lifestyle.min,    minMax.lifestyle.max),
      safety:       normalize(n.safety,       minMax.safety.min,       minMax.safety.max, true),
    };

    const finalScore =
      (userPrefs.affordabilityWeight || 1) * scores.affordability +
      (userPrefs.transitWeight || 1)      * scores.transit +
      (userPrefs.proximityWeight || 1)    * scores.proximity +
      (userPrefs.lifestyleWeight || 1)    * scores.lifestyle +
      (userPrefs.safetyWeight || 1)       * scores.safety;

    return {
      ...n,
      matchScore: Number(finalScore.toFixed(3)),
    };
  }).sort((a, b) => b.matchScore - a.matchScore); // Sort descending
}

module.exports = { calculateMatchScores };
