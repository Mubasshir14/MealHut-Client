/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleMealProviders } from "@/services/MealProviders";
import React from "react";
import Image from "next/image";
import { getAllMeals } from "@/services/Meal";
import FoodCard from "@/components/Shared/FoodCard";

const MealProvidrrsPage = async ({
  params,
}: {
  params: Promise<{ mealProvidersId: string }>;
}) => {
  const { mealProvidersId } = await params;
  const { data: mealProvider } = await getSingleMealProviders(mealProvidersId);
  const { data: allMeals } = await getAllMeals();

  const mealsForProviderMeal = allMeals.filter(
    (meal: any) => meal.mealProvider === mealProvidersId
  );
 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto border-2 border-red-400 bg-green-200/5 p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <Image
            src={mealProvider?.logo}
            alt={mealProvider.mealProviderName}
            width={400}
            height={400}
            className="rounded-lg mx-auto"
          />
        </div>

        <h1 className="lg:text-3xl font-semibold text-center text-red-400 mb-4">
          {mealProvider.mealProviderName}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {mealProvider.servicesOffered}
        </p>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Address:</span>
            <span>{mealProvider.address}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Contact:</span>
            <span>{mealProvider.contactNumber}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Website:</span>
            <span>
              <a
                href={mealProvider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {mealProvider.website}
              </a>
            </span>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700">Meals Offered:</h2>
            <ul className="grid grid-cols-2 gap-2 mt-2 text-gray-600">
              {mealProvider.mealsOffered.map(
                (
                  meal:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactPortal
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <li
                    key={index}
                    className="bg-green-100 p-2 text-gray-700 font-bold uppercase rounded-lg text-center"
                  >
                    {meal}
                  </li>
                )
              )}
            </ul>
          </div>

          {mealProvider.socialMediaLinks.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold text-gray-700">Follow Us:</h2>
              <div className="flex gap-4 mt-2">
                {mealProvider.socialMediaLinks.facebook && (
                  <a
                    href={mealProvider.socialMediaLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Facebook
                  </a>
                )}
                {mealProvider.socialMediaLinks.twitter && (
                  <a
                    href={mealProvider.socialMediaLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    Twitter
                  </a>
                )}
                {mealProvider.socialMediaLinks.instagram && (
                  <a
                    href={mealProvider.socialMediaLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-3xl font-bold text-center text-red-400 mb-6">
          Meals 🍽️
        </h2>

        {mealsForProviderMeal?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
            {mealsForProviderMeal?.map((meal: any) => (
              <FoodCard key={meal._id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-xl text-gray-500">
            <span>🥺</span>
            <span> No meals available at the moment.</span>
            <span className="mt-2">Please check back later!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealProvidrrsPage;
