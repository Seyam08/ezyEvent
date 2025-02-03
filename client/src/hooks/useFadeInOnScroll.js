import { useEffect, useRef } from "react";

const useFadeInOnScroll = () => {
  const refs = useRef([]); // Store multiple refs in an array

  useEffect(() => {
    const handleScroll = () => {
      refs.current.forEach((ref) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          ref.classList.remove("opacity-0", "translate-y-5");
          ref.classList.add("opacity-100", "translate-y-0");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Return a function to attach refs
  const setRef = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return setRef;
};

export default useFadeInOnScroll;
