import React from "react";

const SpecialOffers = () => {
  return (
    <section id="special-offers" className="py-16 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-400">Special Offers & Discounts</h2>
          <p className="text-lg text-gray-700 mt-2">
            Grab the best deals and save big on your favorite meals!
          </p>
        </div>

        {/* Offers Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Offer 1: 20% Off on First Order */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl flex flex-col justify-between">
            <h3 className="text-3xl font-bold text-red-400">20% Off</h3>
            <p className="text-lg text-gray-600 mt-2">Get 20% off on your first order with us!</p>
            <p className="text-lg font-semibold text-red-400 mt-4">Use Code: FIRST20</p>
            <button className="mt-6 px-6 py-2 bg-red-400 text-white font-semibold rounded-lg transition-transform transform hover:scale-105">
              Order Now
            </button>
          </div>

          {/* Offer 2: Free Delivery */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl flex flex-col justify-between">
            <h3 className="text-3xl font-bold text-green-400">Free Delivery</h3>
            <p className="text-lg text-gray-600 mt-2">Enjoy free delivery on orders above $50!</p>
            <button className="mt-6 px-6 py-2 bg-green-400 text-white font-semibold rounded-lg transition-transform transform hover:scale-105">
              Shop Now
            </button>
          </div>

          {/* Offer 3: Buy 1 Get 1 Free */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl flex flex-col justify-between">
            <h3 className="text-3xl font-bold text-green-400">Buy 1 Get 1 Free</h3>
            <p className="text-lg text-gray-600 mt-2">Buy any meal and get the second one for free!</p>
            <p className="text-lg font-semibold text-green-400 mt-4">Limited Time Offer</p>
            <button className="mt-6 px-6 py-2 bg-green-400 text-white font-semibold rounded-lg transition-transform transform hover:scale-105">
              Claim Offer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
