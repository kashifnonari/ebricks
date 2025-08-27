"use client";
import React, { useState, useEffect } from "react";

const images = [
  "/images/bricks/contact.jpg",
  "/images/bricks/kiln.jpg",
  "/images/bricks/kachi.webp",
  "/images/bricks/pakki.webp",
];

const bricktype = [
  "/images/bricktype/awal.jpg",
  "/images/bricktype/dom.webp",
  "/images/bricktype/kachi.webp",
  "/images/bricktype/pakki.webp",
  "/images/bricktype/b-1.jpg",
  "/images/bricktype/b-2.jpg",
  "/images/bricktype/farshi.jpeg",
  "/images/bricktype/kachi.jpg",
  "/images/bricktype/tail.jpg",
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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper to prettify the image name
  const getLabel = (path) => {
    const name = path.split("/").pop().split(".")[0];
    return name.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <main className="w-[90%] mx-auto py-8">
      {/* Carousel */}
      <section className="relative w-full h-56 sm:h-72 md:h-96 lg:h-[28rem] overflow-hidden rounded-lg shadow-lg bg-gray-200 mb-10">
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
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 shadow-md cursor-pointer"
        >
          &#10094;
          </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 shadow-md cursor-pointer"
        >
          &#10095;
          </button>
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

      {/* Brick Type Cards */}
      <h2 className="text-2xl font-bold mb-6 text-center">Brick Types</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
        {bricktype.map((img, idx) => (
          <div
            key={img}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col items-center hover:scale-105 transition-transform duration-300"
          >
            <img
              src={img}
              alt={getLabel(img)}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4 w-full text-center">
              <h3 className="font-semibold text-lg capitalize">
                {getLabel(img)}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
  }