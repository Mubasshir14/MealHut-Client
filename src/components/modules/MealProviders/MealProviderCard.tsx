"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const MealProviderCard = ({ mealProvider }: { mealProvider: any }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-gray-200"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="overflow-hidden rounded-lg mb-4">
        <Image
          src={mealProvider?.logo}
          alt={mealProvider?.mealProviderName}
          className="object-cover w-full rounded-lg"
          width={320}
          height={128}
        />
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mt-2 text-center">
        {mealProvider?.mealProviderName}
      </h3>

      <div className="mt-2">
        <p className="text-gray-600 text-sm text-center">{mealProvider?.address}</p>
        
        {/* Rating stars - 5 stars for all providers */}
        <div className="flex justify-center items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <Star 
              key={index} 
              className="fill-yellow-400 text-yellow-400 w-5 h-5" 
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">5.0</span>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-gray-600 text-sm">
          {mealProvider?.servicesOffered.length > 100
            ? `${mealProvider.servicesOffered.slice(0, 100)}...`
            : mealProvider?.servicesOffered}
        </p>
      </div>

      {showDetails && (
        <div className="absolute inset-0 flex justify-center items-center rounded-lg">
          <Link
            href={`/mealProviders/${mealProvider._id}`}
           
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-white p-3 rounded-full hover:bg-green-400 hover:text-white transition-colors duration-300 shadow-lg"
          >
            <Eye className="" />
            
          </Link>
        </div>
      )}
    </div>
  );
};

export default MealProviderCard;