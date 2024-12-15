import { useEffect, useState } from "react";

// You may edit this file, add new files to support this file,
// and/or add new dependencies to the project as you see fit.
// However, you must not change the surface API presented from this file,
// and you should not need to change any other files in the project to complete the challenge

type UseCachingFetch = (url: string) => {
  isLoading: boolean;
  data: unknown;
  error: Error | null;
};

/**
 * 1. Implement a caching fetch hook. The hook should return an object with the following properties:
 * - isLoading: a boolean that is true when the fetch is in progress and false otherwise
 * - data: the data returned from the fetch, or null if the fetch has not completed
 * - error: an error object if the fetch fails, or null if the fetch is successful
 *
 * This hook is called three times on the client:
 *  - 1 in App.tsx
 *  - 2 in Person.tsx
 *  - 3 in Name.tsx
 *
 * Acceptance Criteria:
 * 1. The application at /appWithoutSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should only see 1 network request in the browser's network tab when visiting the /appWithoutSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */
// Cache object to store fetched data
const cache: { [key: string]: unknown } = {};

export const useCachingFetch: UseCachingFetch = (url: string) => {
  // Check for pre cached data
  const cachedData = cache[url];
  
  // Initialize state based on whether we have cached data
  const [isLoading, setIsLoading] = useState<boolean>(!cachedData);
  const [data, setData] = useState<unknown>(cachedData || null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // If we already have data do not fetch again
    if (cachedData) return;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        cache[url] = response;
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [url, cachedData]);

  return { data, isLoading, error };
};


/**
 * 2. Implement a preloading caching fetch function. The function should fetch the data.
 *
 * This function will be called once on the server before any rendering occurs.
 *
 * Any subsequent call to useCachingFetch should result in the returned data being available immediately.
 * Meaning that the page should be completely serverside rendered on /appWithSSRData
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript disabled, you should see a list of people.
 * 2. You have not changed any code outside of this file to achieve this.
 * 3. This file passes a type-check.
 *
 */
export const preloadCachingFetch = async (url: string): Promise<void> => {
  console.log(`Preloding data for ${url}`);
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      cache[url] = response; // Fetched data in cache
      console.log(`Data for ${url} cached successfully`);
    })
    .catch((err) => {
      console.error(`Failed to preload data for ${url}:`, err);
    });
};

/**
 * 3.1 Implement a serializeCache function that serializes the cache to a string.
 * 3.2 Implement an initializeCache function that initializes the cache from a serialized cache string.
 *
 * Together, these two functions will help the framework transfer your cache to the browser.
 *
 * The framework will call `serializeCache` on the server to serialize the cache to a string and inject it into the dom.
 * The framework will then call `initializeCache` on the browser with the serialized cache string to initialize the cache.
 *
 * Acceptance Criteria:
 * 1. The application at /appWithSSRData should properly render, with JavaScript enabled, you should see a list of people.
 * 2. You should not see any network calls to the people API when visiting the /appWithSSRData route.
 * 3. You have not changed any code outside of this file to achieve this.
 * 4. This file passes a type-check.
 *
 */

export const serializeCache = (testCache?: { [key: string]: unknown }): string => {
  // If running test then pass mocked cache. for actual use pass cache. Not ideal, but works for now
  const cacheToSerialize = testCache || cache;
  return JSON.stringify(cacheToSerialize);
};

export const initializeCache = (serializedCache: string): void => {
  // Paerse serialized cache string
  try {
    const parsed = JSON.parse(serializedCache);
    // Iterate parsed object and populatecache
    for (const key in parsed) {
      // Not sure what issue eslint has with this, but am ignoring it
      // eslint-disable-next-line no-prototype-builtins
      if (parsed.hasOwnProperty(key)) {
        cache[key] = parsed[key];
      }
    }
  } catch (err) {
    // Error logging if parsing or initialization fails
    console.error("Failed to initialize cache:", err);
  }
};

export const wipeCache = (): void => {
  // Clear cache
  for (const key in cache) {
    delete cache[key];
  }
};

