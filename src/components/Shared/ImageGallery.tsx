"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No image available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`Meal image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          priority
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 transition"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                idx === currentIndex ? "border-green-500" : "border-transparent"
              } transition`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={64}
                height={64}
                objectFit="cover"
                className="rounded-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
