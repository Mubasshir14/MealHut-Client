/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import grilled from "../../../../assets/premium_photo-1723532536299-487180c8fdf5.jpg";
import veg from '../../../../assets/veg.jpg'
import burger from '../../../../assets/burger.jpg'
import chickenTikka from '../../../../assets/chickentikka.jpg'
import salad from '../../../../assets/Mediterranean.jpg'
import chocolate from '../../../../assets/chocolate.jpg'
import shrimp from '../../../../assets/shrimp.jpg'
import suchi from '../../../../assets/suchi.jpg'
const foodItems = [
  {
    id: 1,
    title: "Grilled Salmon Bowl",
    category: "Seafood",
    imageUrl: grilled,
    description: "Fresh salmon with quinoa, avocado, and roasted vegetables",
  },
  {
    id: 2,
    title: "Vegetarian Buddha Bowl",
    category: "Vegetarian",
    imageUrl: veg,
    description: "A colorful mix of roasted vegetables, hummus and quinoa",
  },
  {
    id: 3,
    title: "Classic Beef Burger",
    category: "Burgers",
    imageUrl: burger,
    description: "Premium beef patty with cheese and fresh vegetables",
  },
  {
    id: 4,
    title: "Chicken Tikka Masala",
    category: "Indian",
    imageUrl: chickenTikka,
    description: "Tender chicken in a rich, spiced tomato sauce",
  },
  {
    id: 5,
    title: "Mediterranean Salad",
    category: "Salads",
    imageUrl: salad,
    description: "Fresh greens with feta, olives, and balsamic dressing",
  },
  {
    id: 6,
    title: "Chocolate Lava Cake",
    category: "Desserts",
    imageUrl: chocolate,
    description: "Warm chocolate cake with a molten center",
  },
  {
    id: 7,
    title: "Shrimp Pasta",
    category: "Pasta",
    imageUrl: shrimp,
    description: "Garlic butter shrimp with linguine and cherry tomatoes",
  },
  {
    id: 8,
    title: "Vegan Sushi Rolls",
    category: "Vegan",
    imageUrl: suchi,
    description: "Avocado, cucumber and carrot rolled in seasoned rice",
  },
];

const allCategories = [
  "All",
  ...new Set(foodItems.map((item) => item.category)),
];

const FoodGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-red-50 text-red-400 rounded-full text-sm font-medium mb-3">
            Our Delicious Food
          </span>
          <h2 className="text-4xl font-bold text-red-400 mb-4">
            Explore Our Food Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Feast your eyes on our culinary creations, crafted with love and
            premium ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-green-400 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-orange-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-green-400 text-white text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No items found in this category.
            </p>
          </div>
        )}

        {/* View all button, shown when a category is selected
        {selectedCategory !== 'All' && (
          <div className="flex justify-center mt-10">
            <button 
              onClick={() => setSelectedCategory('All')}
              className="px-6 py-3 bg--500 text-white font-medium rounded-lg hover:bg-orange-600 transition shadow-md hover:shadow-lg"
            >
              View All Dishes
            </button>
          </div>
        )} */}
      </div>
    </section>
  );
};

export default FoodGallery;
