export const metersToKm = (meters: number, decimals: number = 2): number => {
  if (isNaN(meters)) {
    throw new Error("Invalid input: meters must be a number");
  }
  const km = meters / 1000;
  return Number(km.toFixed(decimals));
};
