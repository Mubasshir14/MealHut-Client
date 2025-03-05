"use client"
import Image from "next/image";
import React, { useState } from "react";
import img from '../../../../assets/weight-loss-bmi-man-woman-before-after-diet-fitness-fat-thin-man-woman_162329-324.avif'

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [calories, setCalories] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const bmiResult = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(bmiResult);

    if (bmiResult < 18.5) {
      setFeedback("You are underweight. Consider gaining some weight for better health.");
    } else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
      setFeedback("You have a normal weight. Keep up the good work!");
    } else if (bmiResult >= 25 && bmiResult <= 29.9) {
      setFeedback("You are overweight. Consider adopting a healthier lifestyle.");
    } else {
      setFeedback("You are obese. It is recommended to consult a doctor for advice.");
    }
  };

  const calculateBMR = () => {
    let bmrResult;
    if (gender === "male") {
      bmrResult = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) + 5;
    } else {
      bmrResult = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseInt(age) - 161;
    }

    let activityMultiplier;
    switch (activityLevel) {
      case "sedentary":
        activityMultiplier = 1.2;
        break;
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      default:
        activityMultiplier = 1.2;
    }

    setCalories(bmrResult * activityMultiplier);
    setBmr(bmrResult);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simple animation effect with setTimeout
    setTimeout(() => {
      calculateBMI();
      calculateBMR();
      setIsCalculating(false);
    }, 500);
  };

  const getBmiColor = () => {
    if (!bmi) return "text-blue-600";
    if (bmi < 18.5) return "text-yellow-500";
    if (bmi >= 18.5 && bmi <= 24.9) return "text-green-500";
    if (bmi >= 25 && bmi <= 29.9) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <section id="bmi-bmr-calculator" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-400 ">
            BMI & BMR Calculator
          </h2>
          <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">
            Calculate your Body Mass Index and Basal Metabolic Rate to understand your health metrics and daily caloric needs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Form Column */}
          <div className="w-full lg:w-1/2">
            <form 
              onSubmit={handleSubmit} 
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Enter Your Details</h3>
              <div className="space-y-5">
                <div className="relative">
                  <label htmlFor="weight" className="block text-base font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter your weight"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
                    required
                  />
                </div>

                <div className="relative">
                  <label htmlFor="height" className="block text-base font-medium text-gray-700 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter your height"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
                    required
                  />
                </div>

                <div className="relative">
                  <label htmlFor="age" className="block text-base font-medium text-gray-700 mb-1">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">Gender</label>
                  <div className="flex gap-4">
                    <div 
                      className={`flex-1 p-3 border rounded-lg cursor-pointer transition ${
                        gender === "male" 
                          ? "bg-red-50 border-red-400 text-red-600" 
                          : "bg-gray-50 border-gray-300 text-gray-700"
                      }`}
                      onClick={() => setGender("male")}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">♂</span>
                        <span>Male</span>
                      </div>
                    </div>
                    <div 
                      className={`flex-1 p-3 border rounded-lg cursor-pointer transition ${
                        gender === "female" 
                          ? "bg-red-50 border-red-400 text-red-600" 
                          : "bg-gray-50 border-gray-300 text-gray-700"
                      }`}
                      onClick={() => setGender("female")}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">♀</span>
                        <span>Female</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="activityLevel" className="block text-base font-medium text-gray-700 mb-1">
                    Activity Level
                  </label>
                  <select
                    id="activityLevel"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
                  >
                    <option value="sedentary">Sedentary (little to no exercise)</option>
                    <option value="light">Lightly active (1-3 days/week)</option>
                    <option value="moderate">Moderately active (3-5 days/week)</option>
                    <option value="active">Very active (6-7 days a week)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isCalculating}
                  className="w-full mt-4 bg-red-400  text-white py-3 px-6 rounded-lg font-medium shadow-md hover:from-red-500 hover:to-pink-600 transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 disabled:opacity-70"
                >
                  {isCalculating ? "Calculating..." : "Calculate My Results"}
                </button>
              </div>
            </form>
          </div>

          {/* Results Column */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            {bmi === null ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative bg-white rounded-2xl p-3 shadow-lg">
                  <Image
                    src={img}
                    alt="BMI Visualization"
                    className="w-full rounded-xl shadow-sm"
                  />
                  <div className="text-center mt-4 mb-2 px-4">
                    <p className="text-gray-700 italic">
                      Fill in your details and calculate to see your personalized health metrics
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full transition-all hover:shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h3>
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Your BMI:</span>
                      <span className={`text-2xl font-bold ${getBmiColor()}`}>
                        {bmi.toFixed(1)}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          bmi < 18.5 ? 'bg-yellow-500' : 
                          bmi <= 24.9 ? 'bg-green-500' : 
                          bmi <= 29.9 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(bmi * 2.5, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-gray-800">{feedback}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="text-blue-800 font-medium">Basal Metabolic Rate</div>
                      <div className="text-2xl font-bold text-blue-600 mt-1">
                        {bmr?.toFixed(0)} <span className="text-sm font-normal">cal/day</span>
                      </div>
                      <div className="text-xs text-blue-700 mt-1">Calories your body needs at complete rest</div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <div className="text-green-800 font-medium">Daily Calorie Needs</div>
                      <div className="text-2xl font-bold text-green-600 mt-1">
                        {calories?.toFixed(0)} <span className="text-sm font-normal">cal/day</span>
                      </div>
                      <div className="text-xs text-green-700 mt-1">Based on your activity level</div>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      onClick={() => {
                        setBmi(null);
                        setBmr(null);
                        setCalories(null);
                        setFeedback("");
                      }}
                      className="text-red-400 hover:text-red-500 text-sm font-medium hover:underline"
                    >
                      Reset and calculate again
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;