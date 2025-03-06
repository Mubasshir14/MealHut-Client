export const dynamic = "force-dynamic";
/* eslint-disable @typescript-eslint/no-explicit-any */
import FoodCard from "@/components/Shared/FoodCard";
import { Button } from "@/components/ui/button";
import { getAllMeals } from "@/services/Meal";
import Link from "next/link";

const MealHomePage = async () => {
  const { data: meals } = await getAllMeals();

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-red-400 mb-6">
        Our Delicious Meals 🍽️
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
        {meals?.slice(0, 8).map((meal: any) => (
          <FoodCard key={meal._id} meal={meal} />
        ))}
      </div>
      <Link href="/meals" className="flex items-center justify-center mt-4">
        <Button
          variant="outline"
          className="border border-red-400 text-red-400  hover:bg-red-400 hover:text-white transition"
        >
          See More
        </Button>
      </Link>
    </div>
  );
};

export default MealHomePage;
