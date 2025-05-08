import { useEffect, useState } from "react";

const useScreenSize = (screenSize) => {
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setSmallScreen(window.innerWidth < screenSize);
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [screenSize]);

  return smallScreen;
};

export default useScreenSize;
