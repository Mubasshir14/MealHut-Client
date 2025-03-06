import React from "react";
import HeroSection from "../modules/Home/HeroSection";
import AboutSection from "../modules/Home/AboutUs";
import MealHomePage from "../modules/Home/Meal";
import MealProvidersComponents from "../modules/MealProviders";
import Works from "../modules/Home/HowWorks";
import WhyChooseUs from "../modules/Home/WhyChooseUs";
import SpecialOffers from "../modules/Home/SpecialOffer";
import DietPlanQA from "../modules/Home/DietPlanQA";
import BMICalculator from "../modules/Home/BMICalculator";
import NewsletterSignup from "../modules/Home/NewsLetter";
import FoodGallery from "../modules/Home/FoodGallery";
import ReviewSection from "../modules/Home/Review";

const HomeComponent = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <MealHomePage />
      <MealProvidersComponents />
      <Works />
      <WhyChooseUs />
      <SpecialOffers />
      <DietPlanQA />
      <BMICalculator />
      <NewsletterSignup />
      <FoodGallery />
      <ReviewSection />
    </div>
  );
};

export default HomeComponent;
