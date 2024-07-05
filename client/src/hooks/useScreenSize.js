import { useEffect, useState } from 'react';

const useScreenSize = (screenSize) => {
    const [smallScreen, setsmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setsmallScreen(window.innerWidth < screenSize);
        };
        checkScreenSize();
        
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize)
        };
    }, [screenSize]);

    return smallScreen;
};

export default useScreenSize;
