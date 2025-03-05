/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image";
import React, { useState } from "react";
import img from '../../../../assets/dan-gold-4_jhDO54BYg-unsplash.jpg'

const DietPlanQA = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index:any) => {
    if (index === activeIndex) {
      setActiveIndex(null); 
    } else {
      setActiveIndex(index); 
    }
  };

  const questions = [
    {
      question: "What is a balanced diet plan?",
      answer: "A balanced diet plan includes a variety of foods from all food groups: proteins, carbohydrates, fats, vitamins, and minerals to provide the necessary nutrients to maintain health and well-being."
    },
    {
      question: "How can I lose weight with a diet plan?",
      answer: "A good diet plan for weight loss includes consuming fewer calories than your body burns, eating more whole foods, and reducing processed food intake. Regular exercise can complement your diet plan."
    },
    {
      question: "Can a diet plan help with muscle building?",
      answer: "Yes, a diet plan focused on muscle building includes higher protein intake, moderate carbs, and healthy fats, along with regular strength training exercises to support muscle growth."
    },
    {
      question: "What are the best foods for a diet plan?",
      answer: "The best foods for a healthy diet plan include lean proteins (chicken, tofu, fish), whole grains (quinoa, oats), vegetables, fruits, nuts, and healthy fats like avocado and olive oil."
    },
    {
      question: "How much water should I drink on a diet?",
      answer: "It is recommended to drink at least 8 cups (2 liters) of water a day. However, the amount may vary depending on your body weight, activity level, and climate."
    },
    {
      question: "Should I follow a diet plan for better skin?",
      answer: "Yes, a balanced diet rich in vitamins, minerals, and healthy fats can promote better skin health. Foods like leafy greens, berries, and nuts can support skin hydration and reduce inflammation."
    },
  ];

  return (
    <section id="diet-plan-qa" className="py-16 bg-gray-50 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-400">Diet Plan Q&A</h2>
          <p className="text-lg text-gray-700 mt-2">
            Your most common questions about diet plans answered!
          </p>
        </div>

        {/* Q&A Section */}
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-12">
          {/* Q&A Left Side */}
          <div className="lg:w-1/2 space-y-6">
            {questions.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-xl shadow-green-50 rounded-xl p-6 cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-800">{item.question}</h3>
                  <span className={`text-xl ${activeIndex === index ? "text-red-400" : "text-green-400"}`}>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>
                {activeIndex === index && (
                  <p className="mt-4 text-gray-600">{item.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Image Right Side */}
          <div className="lg:w-1/2 hidden lg:flex items-center">
            <Image
              src={img}
              alt="Diet Plan"
              className="w-full h-auto rounded-xl shadow-xl"
              width={1168} 
              height={780} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DietPlanQA;
