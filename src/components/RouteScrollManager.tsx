"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteScrollManager() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const goToPosition = () => {
      const hash = window.location.hash;

      if (hash) {
        const id = decodeURIComponent(hash.slice(1));
        const target = document.getElementById(id);

        if (target) {
          target.scrollIntoView({
            behavior: "auto",
            block: "start",
          });
          return;
        }
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };

    const frame = requestAnimationFrame(goToPosition);
    const timer = window.setTimeout(goToPosition, 60);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
