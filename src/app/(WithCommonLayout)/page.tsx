export const dynamic = "force-dynamic";
import AboutSection from "@/components/modules/Home/AboutUs";
import BMICalculator from "@/components/modules/Home/BMICalculator";
import DietPlanQA from "@/components/modules/Home/DietPlanQA";
import FoodGallery from "@/components/modules/Home/FoodGallery";
import Hero from "@/components/modules/Home/HeroSection";
import Works from "@/components/modules/Home/HowWorks";
import MealHomePage from "@/components/modules/Home/Meal";
import NewsletterSignup from "@/components/modules/Home/NewsLetter";
import ReviewSection from "@/components/modules/Home/Review";
import SpecialOffers from "@/components/modules/Home/SpecialOffer";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import MealProvidersComponents from "@/components/modules/MealProviders";

const HomePage = () => {
  return (
    <div>
     <Hero />
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

export default HomePage;
