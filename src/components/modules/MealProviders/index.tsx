/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { getAllMealProviders } from "@/services/MealProviders";
import Link from "next/link";
import React from "react";
import MealProviderCard from "./MealProviderCard";

const MealProvidersComponents = async () => {
  const { data: mealProviders } = await getAllMealProviders();
  console.log(mealProviders);
  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-red-400 mb-6">
        See All Meal Providers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
        {mealProviders?.slice(0, 8).map((mealProvider: any) => (
          <MealProviderCard
            key={mealProviders._id}
            mealProvider={mealProvider}
          />
        ))}
      </div>
      <Link href="/mealProviders" className="flex items-center justify-center mt-4">
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

export default MealProvidersComponents;
