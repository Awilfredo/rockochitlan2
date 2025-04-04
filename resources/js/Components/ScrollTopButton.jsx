import React, { useState, useEffect } from "react";

const ScrollToTopButton = ({ scrollRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Maneja el evento de scroll
  const toggleVisibility = () => {
    if (scrollRef.current.scrollTop > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    // Hacer scroll hacia arriba en el contenedor específico
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", toggleVisibility);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", toggleVisibility);
      }
    };
  }, [scrollRef]);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
