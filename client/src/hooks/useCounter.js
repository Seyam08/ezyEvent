import { useEffect, useState } from "react";

const useCounter = (limit) => {
  if (typeof limit !== "number") {
    throw new Error("The limit of useCounter hook must be a number");
  }

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < limit) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < limit) {
            return prevCount + 1;
          } else {
            clearInterval(interval);
            return prevCount;
          }
        });
      }, 1); // Adjust the interval time for the desired counting speed

      return () => clearInterval(interval);
    }
  }, [count, limit]);

  return count;
};

export default useCounter;
