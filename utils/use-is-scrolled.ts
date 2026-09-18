"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks whether the page has been scrolled past `threshold` pixels.
 *
 * Scroll position is an external store, so it is read through
 * `useSyncExternalStore` rather than `useState` + `useEffect`: the effect
 * variant needs a synchronous `setState` in the effect body to pick up the
 * initial scroll position, which cascades an extra render on mount. The
 * snapshot is a boolean primitive, so there is no re-render loop. The third
 * argument is the server snapshot, which this app needs because every page is
 * pre-rendered.
 */
export function useIsScrolled(threshold = 24): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("scroll", onStoreChange, { passive: true });
    return () => window.removeEventListener("scroll", onStoreChange);
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
