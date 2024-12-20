// Cache for storing karma levels and corresponding colors
const levelCache: { [karmaPoints: number]: number } = {};
const colorCache: { [level: number]: string } = {};

/**
 * Get the user level based on their karma points.
 * @param karmaPoints - The user's karma points.
 * @param maxKarma - The maximum karma points (e.g., 138000).
 * @param totalLevels - The total number of levels (e.g., 100).
 * @returns The user's level (1 to totalLevels).
 */
export function getUserLevel(
  karmaPoints: number,
  maxKarma: number = 138000,
  totalLevels: number = 100
): number {
  // Check cache first
  if (levelCache[karmaPoints]) {
    return levelCache[karmaPoints];
  }

  // Ensure karmaPoints do not exceed maxKarma
  const normalizedKarma = Math.min(karmaPoints, maxKarma);

  // Use a logarithmic scaling to determine the level
  const level = Math.floor(
    totalLevels * Math.log10(1 + (normalizedKarma / maxKarma) * 9)
  );

  // Ensure the level is at least 1
  const finalLevel = Math.max(level, 1);

  // Cache the result before returning it
  levelCache[karmaPoints] = finalLevel;

  return finalLevel;
}

/**
 * Get the color corresponding to a user's level.
 * @param level - The user's level (1 to 100).
 * @returns A hex color code as a string.
 */
export function getLevelColor(level: number): string {
  // Check cache first
  if (colorCache[level]) {
    return colorCache[level];
  }

  let color: string;

  if (level <= 20) {
    // Shades of gray
    color = interpolateColor("#A9A9A9", "#D3D3D3", level / 20);
  } else if (level <= 40) {
    // Shades of blue
    color = interpolateColor("#4682B4", "#87CEEB", (level - 20) / 20);
  } else if (level <= 60) {
    // Shades of green
    color = interpolateColor("#228B22", "#7CFC00", (level - 40) / 20);
  } else if (level <= 80) {
    // Shades of purple
    color = interpolateColor("#6A5ACD", "#BA55D3", (level - 60) / 20);
  } else if (level <= 99) {
    // Shades of red and orange
    color = interpolateColor("#FF4500", "#FFA500", (level - 80) / 19);
  } else {
    // Gold for level 100
    color = "#FFD700";
  }

  // Cache the result before returning it
  colorCache[level] = color;

  return color;
}

/**
 * Interpolate between two colors.
 * @param color1 - The start color (hex).
 * @param color2 - The end color (hex).
 * @param t - The interpolation factor (0 to 1).
 * @returns A hex color code as a string.
 */
export function interpolateColor(
  color1: string,
  color2: string,
  t: number
): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);

  return rgbToHex(r, g, b);
}

/**
 * Convert a hex color to an RGB object.
 * @param hex - The hex color code.
 * @returns An object with r, g, and b values.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

/**
 * Convert RGB values to a hex color.
 * @param r - The red value (0–255).
 * @param g - The green value (0–255).
 * @param b - The blue value (0–255).
 * @returns A hex color code as a string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

// // Example usage:
// console.log(getLevelColor(1)); // Dark gray
// console.log(getLevelColor(25)); // Light blue
// console.log(getLevelColor(50)); // Bright green
// console.log(getLevelColor(75)); // Vibrant purple
// console.log(getLevelColor(99)); // Orange
// console.log(getLevelColor(100)); // Gold

// // Example usage:
// console.log(getUserLevel(1000)); // Example for 1,000 karma points
// console.log(getUserLevel(50000)); // Example for 50,000 karma points
// console.log(getUserLevel(138000)); // Should be 100
