import { useRef } from "react";

function useScrollToElement() {
  const elementRef = useRef(null);

  const scrollToElement = () => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("Element is already in view, no need to scroll");
              observer.disconnect();
            } else {
              console.log("Scrolling to element:", elementRef.current);
              if (elementRef.current) {
                elementRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(elementRef.current);
    } else {
      console.log("Element reference is null");
    }
  };

  return { elementRef, scrollToElement };
}

export default useScrollToElement;
