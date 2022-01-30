import { useEffect, useState } from 'react';

const useScrollSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [scrollSize, setScrollSize] = useState<any>({
      scrollX: undefined,
      scrollY: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== 'undefined') {
        // Handler to call on window resize
        const handleResize = () => {
          // Set window width/height to state
          setScrollSize({
            scrollY: window.scrollY,
            scrollX: window.scrollX,
          });
        }
      
        // Add event listener
        window.addEventListener('scroll', handleResize, false);
       
        // Call handler right away so state gets updated with initial window size
        handleResize();
      
        // Remove event listener on cleanup
        return () => window.removeEventListener("scroll", handleResize, false);
      }
    }, []); // Empty array ensures that effect is only run on mount

    return scrollSize;
}

export default useScrollSize;
