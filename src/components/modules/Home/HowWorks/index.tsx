import Image from "next/image";
import React from "react";
import {
  FaUtensils,
  FaShoppingCart,
  FaCreditCard,
  FaSmile,
} from "react-icons/fa";
import img from "../../../../assets/pablo-merchan-montes-Orz90t6o0e4-unsplash.jpg";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="pb-16 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-400">How It Works</h2>
          <p className="text-lg text-gray-600 mt-2">
            Simple & hassle-free process to enjoy delicious meals at home.
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Step 1 */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <FaUtensils className="text-5xl text-green-400" />
            </div>
            <Image
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80"
              alt="Choose a Meal"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />
            <h3 className="text-xl font-bold text-green-400 mt-4">
              Choose Your Meal
            </h3>
            <p className="text-gray-600 mt-2">
              Browse our menu & select your favorite dishes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <FaShoppingCart className="text-5xl text-green-400" />
            </div>
            <Image
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80"
              alt="Add to Cart"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />
            <h3 className="text-xl font-bold text-green-400 mt-4">
              Add to Cart
            </h3>
            <p className="text-gray-600 mt-2">
              Easily add meals to your cart & customize your order.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <FaCreditCard className="text-5xl text-green-400" />
            </div>
            <Image
              src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80"
              alt="Checkout"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />
            <h3 className="text-xl font-bold text-green-400 mt-4">
              Secure Checkout
            </h3>
            <p className="text-gray-600 mt-2">
              Place your order with secure payment options.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center p-6 bg-white shadow-xl rounded-xl transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <FaSmile className="text-5xl text-green-400" />
            </div>
            <Image
              src={img}
              alt="Enjoy_Meal"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />

            <h3 className="text-xl font-bold text-green-400 mt-4">
              Enjoy Your Meal
            </h3>
            <p className="text-gray-600 mt-2">
              Get fresh meals delivered & enjoy hassle-free dining.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
