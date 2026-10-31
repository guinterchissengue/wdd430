let failures = 0;
let circuitOpen = false;
let openedAt = 0;

const FAILURE_LIMIT = 3;
const RESET_TIME = 10000;

const fallbackMovies = [
  "Popular Movie 1",
  "Popular Movie 2",
  "Popular Movie 3",
];

export async function getRecommendations() {
  if (circuitOpen) {
    const elapsed = Date.now() - openedAt;

    if (elapsed < RESET_TIME) {
      return fallbackMovies;
    }

    // Allow one new attempt after the waiting period.
    circuitOpen = false;
  }

  try {
    const apiUrl = process.env.RECOMMENDATIONS_API_URL;
    if (!apiUrl) {
      throw new Error("RECOMMENDATIONS_API_URL is not configured");
    }

    const response = await fetch(apiUrl, {
      signal: AbortSignal.timeout(2000),
    });

    if (!response.ok) {
      throw new Error("Recommendation service failed");
    }

    failures = 0;
    return await response.json();
  } catch {
    failures++;

    if (failures >= FAILURE_LIMIT) {
      circuitOpen = true;
      openedAt = Date.now();
    }

    return fallbackMovies;
  }
}
