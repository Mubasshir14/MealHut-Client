import React from "react";
import { FaLeaf, FaShippingFast, FaTags } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-16 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-400">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mt-2">
            Discover why we’re the best choice for your meal delivery needs.
          </p>
        </div>

        {/* USPs Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* USP 1: Fresh Ingredients */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <FaLeaf className="text-5xl text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-green-400 mt-4">Fresh Ingredients</h3>
            <p className="text-gray-600 mt-2">
              We source the freshest ingredients directly from local farms to ensure every meal is full of flavor and nutrition.
            </p>
          </div>

          {/* USP 2: Fast Delivery */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <FaShippingFast className="text-5xl text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-green-400 mt-4">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">
              We guarantee quick and reliable delivery to bring your meals right to your door when you need them.
            </p>
          </div>

          {/* USP 3: Affordable Pricing */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <FaTags className="text-5xl text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-green-400 mt-4">Affordable Pricing</h3>
            <p className="text-gray-600 mt-2">
              Enjoy high-quality meals without breaking the bank. We offer competitive pricing to suit all budgets.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
