import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in the viewport using IntersectionObserver.
 * Returns the ID of the active section.
 */
export function useScrollSpy(sectionIds: string[], offset = 100): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        {
          rootMargin: `-${offset}px 0px -55% 0px`,
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionIds, offset]);

  return activeId;
}
