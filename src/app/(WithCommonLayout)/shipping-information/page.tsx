import React from "react";

const ShippingInfo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="max-w-2xl w-full p-8 border border-gray-300  rounded-2xl shadow-lg bg-white  transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-red-400 text-center mb-4">
          Shipping Information
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
          We deliver meals within <span className="font-bold text-red-400">30-60 minutes</span> depending on your location.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mt-4">
          <span className="font-semibold text-red-400">Shipping fees</span> vary based on distance.
        </p>

        <div className="mt-6 flex justify-center">
          <button className="px-6 py-3 text-lg font-medium rounded-xl bg-red-400 text-white shadow-md hover:bg-red-500 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
