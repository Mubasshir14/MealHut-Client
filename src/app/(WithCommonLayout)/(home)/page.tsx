import AboutSection from "@/components/modules/Home/AboutUs";
import BMICalculator from "@/components/modules/Home/BMICalculator";
import DietPlanQA from "@/components/modules/Home/DietPlanQA";
import FoodGallery from "@/components/modules/Home/FoodGallery";
import HeroSection from "@/components/modules/Home/HeroSection";
import HowItWorks from "@/components/modules/Home/HowWorks";
import MealHomePage from "@/components/modules/Home/Meal";
import NewsletterSignup from "@/components/modules/Home/NewsLetter";
import ReviewSection from "@/components/modules/Home/Review";
import SpecialOffers from "@/components/modules/Home/SpecialOffer";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import MealProvidersComponents from "@/components/modules/MealProviders";
import React from "react";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <MealHomePage />
      <MealProvidersComponents />
      <HowItWorks />
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

export default HomePage;
