import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { profile } from "../data/profile";

const STORAGE_KEY = "portfolio-view-count";
const VISITOR_KEY = "portfolio-visited";

/**
 * ViewCounter — tracks portfolio visits.
 * Development: Uses localStorage as a counter store.
 * Production:  Set profile.viewCounterApiUrl to a real counter API endpoint.
 *              The component will POST to that endpoint and display the result.
 */
export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // ── If a real API URL is configured, use it ──
      if (profile.viewCounterApiUrl) {
        try {
          const hasVisited = sessionStorage.getItem(VISITOR_KEY);
          const method = hasVisited ? "GET" : "POST";
          const res = await fetch(profile.viewCounterApiUrl, { method });
          if (res.ok) {
            const data = await res.json();
            setCount(data.count ?? data.views ?? 0);
            sessionStorage.setItem(VISITOR_KEY, "true");
          }
        } catch {
          setCount(null);
        } finally {
          setLoading(false);
        }
        return;
      }

      // ── Fallback: localStorage-based counter ──
      const hasVisited = sessionStorage.getItem(VISITOR_KEY);
      const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
      const newCount = hasVisited ? stored : stored + 1;

      if (!hasVisited) {
        localStorage.setItem(STORAGE_KEY, String(newCount));
        sessionStorage.setItem(VISITOR_KEY, "true");
      }

      setCount(newCount);
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500">
        <Eye size={14} />
        Loading…
      </span>
    );
  }

  if (count === null) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
      aria-label={`${count.toLocaleString()} portfolio views`}
    >
      <Eye size={14} />
      <span>{count.toLocaleString()} Portfolio Views</span>
    </span>
  );
}
