/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';

const AboutSection = () => {
    return (
        <section id="about" className="max-w-screen-xl mx-auto">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="section-header text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-red-400">About Us</h2>
                    <p className="text-lg text-gray-600">Learn what makes our meal delivery service special</p>
                </div>

                <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
                    {/* Image Section */}
                    <div className="flex-1 rounded-lg overflow-hidden shadow-lg">
                        <Image 
                            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80" 
                            alt="Chef preparing food" 
                            className="w-full h-full object-cover" 
                            width={1168} 
                            height={780} 
                        />
                    </div>

                    {/* Text Section */}
                    <div className="flex-1">
                        <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-green-400">
                            We're on a mission to revolutionize home cooking
                        </h3>
                        <p className="text-lg mb-6 text-gray-700 text-justify">
                            Founded in 2018, MealBox started with a simple idea: make it easy for busy people to cook delicious, nutritious meals at home without the hassle of meal planning and grocery shopping.
                        </p>
                        <p className="text-lg mb-6 text-gray-700 text-justify">
                            Our team of renowned chefs craft restaurant-quality recipes that are easy to prepare in your own kitchen. We source only the freshest, seasonal ingredients from local farms and deliver pre-portioned ingredients right to your door.
                        </p>

                        {/* Feature Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                            <div className="text-center">
                                <i className="fas fa-leaf text-4xl text-green-400 mb-4"></i>
                                <h4 className="font-bold mb-2 text-red-400">Fresh Ingredients</h4>
                                <p className="text-sm text-gray-600">We source directly from local farms and suppliers</p>
                            </div>
                            <div className="text-center">
                                <i className="fas fa-utensils text-4xl text-green-400 mb-4"></i>
                                <h4 className="font-bold mb-2 text-red-400">Chef-Crafted</h4>
                                <p className="text-sm text-gray-600">Recipes developed by professional chefs</p>
                            </div>
                            <div className="text-center">
                                <i className="fas fa-seedling text-4xl text-green-400 mb-4"></i>
                                <h4 className="font-bold mb-2 text-red-400">Sustainable</h4>
                                <p className="text-sm text-gray-600">Eco-friendly packaging and practices</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
