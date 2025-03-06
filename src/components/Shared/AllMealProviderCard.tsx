"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getAllMealProviders } from "@/services/MealProviders";
import { Button } from "../ui/button";
import MealProviderCard from "../modules/MealProviders/MealProviderCard";
import { Rings } from "react-loading-icons";

const AllMealProviderCard = () => {
  const [meals, setMeals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 9;

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const { data } = await getAllMealProviders();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const totalPages = Math.ceil(meals.length / limit);
  const currentMeals = meals.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 ">
      <h2 className="lg:text-4xl font-extrabold text-center text-red-500 mb-8">
        All Meal Providers
      </h2>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen py-20">
          <Rings stroke="red" width={60} height={60} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentMeals?.map((mealProvider: any) => (
              <MealProviderCard
                key={mealProvider._id || mealProvider.name}
                mealProvider={mealProvider}
              />
            ))}
          </div>

          <div className="flex justify-center items-center mt-4 space-x-6">
            <Button
              variant="outline"
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors px-6 py-3 rounded-md"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <span className="text-red-500 font-semibold text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors px-6 py-3 rounded-md"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllMealProviderCard;
