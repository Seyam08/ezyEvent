import { throttle } from "lodash";
import { useEffect, useState } from "react";

export function useScroll() {
  const [isScrollTop, setScrollTop] = useState(true);
  const [isScrollUp, setScrollUp] = useState(true);
  const [isScrollBottom, setScrollBottom] = useState(false);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = throttle((event) => {
      const target = event.target;
      let scrollableHeight = 0;

      if (target instanceof Document) {
        scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
      } else {
        scrollableHeight = target?.scrollHeight - target?.offsetHeight;
      }

      const currentScrollTop = window.scrollY <= 0;
      const currentScrollUp = window.scrollY < prevScrollY;
      const currentScrollBottom = window.scrollY >= scrollableHeight;

      if (currentScrollTop !== isScrollTop) setScrollTop(currentScrollTop);
      if (currentScrollUp !== isScrollUp) setScrollUp(currentScrollUp);
      if (currentScrollBottom !== isScrollBottom)
        setScrollBottom(currentScrollBottom);

      prevScrollY = window.scrollY;
    }, 300); // Throttle updates to once every 100ms

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollTop, isScrollUp, isScrollBottom]);

  return { isScrollTop, isScrollUp, isScrollBottom };
}
