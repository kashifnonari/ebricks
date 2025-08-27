"use client";
import React, { useState, useEffect } from "react";

const images = [
  "/images/bricks/contact.jpg",
  "/images/bricks/kiln.jpg",
  "/images/bricks/kachi.webp",
  "/images/bricks/pakki.webp",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((curr) => (curr === 0 ? images.length - 1 : curr - 1));

  const nextSlide = () =>
    setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((curr) => (curr === images.length - 1 ? 0 : curr + 1));
    }, 5000); // <-- 5 seconds (slow like Bootstrap)

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full">
      <section className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[28rem] overflow-hidden rounded-lg shadow-lg bg-gray-200">
        
        {/* Slides (fade effect) */}
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx + 1}`}
            className={`absolute w-full h-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 shadow-md cursor-pointer"
        >
          &#10094;
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 shadow-md cursor-pointer"
        >
          &#10095;
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-3000 ${
                idx === current ? "bg-blue-600 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
