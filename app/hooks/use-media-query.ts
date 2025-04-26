import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect"; // Assuming this exists

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query));
  }

  useIsomorphicLayoutEffect(() => {
    // Ensure this runs only on the client
    if (IS_SERVER) {
      return;
    }

    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Check for the *deprecated* addListener method first.
    // If it exists, use it for compatibility (Safari < 14).
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);

      // Cleanup function for the deprecated method
      return () => {
        matchMedia.removeListener(handleChange);
      };
    } else {
      // Otherwise, use the standard addEventListener method
      matchMedia.addEventListener("change", handleChange);

      // Cleanup function for the standard method
      return () => {
        matchMedia.removeEventListener("change", handleChange);
      };
    }
  }, [query]); // Keep query as dependency

  return matches;
}
