/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleMeal } from "@/services/Meal";
import { Star, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageGallery from "@/components/Shared/ImageGallery";
import AddReviewForm from "@/components/Shared/AddReviewForm";
import ShareButton from "@/components/Shared/ShareButton";
import { getAllReview } from "@/services/Review";
import AddToCart from "@/components/modules/cart/AddToCart";

// export async function generateMetadata({
//   params,
// }: {
//   params: { mealId: string };
// }): Promise<Metadata> {
//   const { data: meal } = await getSingleMeal(params.mealId);
//   return {
//     title: `${meal.name} - Delicious Meal | Meals App`,
//     description: meal.why_eat.substring(0, 150) + "...",
//     openGraph: {
//       title: meal.name,
//       description: meal.why_eat.substring(0, 150) + "...",
//       images: meal.imageUrls.length > 0 ? [meal.imageUrls[0]] : [],
//       type: "article",
//     },
//   };
// }


const MealsDetails = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const { mealId } = await params;
  const { data: meal } = await getSingleMeal(mealId);
  const { data: review } = await getAllReview();
  console.log(review);

  const filteredReviews = review.filter(
    (rev: { mealId: string }) => rev.mealId === mealId
  );
  const totalRating = filteredReviews.reduce(
    (sum: any, rev: { rating: any }) => sum + rev.rating,
    0
  );
  const averageRating =
    filteredReviews.length > 0
      ? Math.round(totalRating / filteredReviews.length)
      : 0;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <Link
        href="/meals"
        className="inline-flex items-center gap-2 text-green-500 mb-6 hover:text-green-600 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Back to Meals</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ImageGallery  images={meal.imageUrls} />

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {meal.name}
              </h1>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5 text-red-500" />
                </Button>
                <ShareButton />
              </div>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {filteredReviews.length || 0} reviews
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold text-green-500">
                ${meal.price}
              </span>
              <span className="text-sm text-gray-500 ml-2">per serving</span>
            </div>
            <span className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
              {meal.category}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Calories</span>
              <span className="font-semibold">{meal.calories} kcal</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Portion Size</span>
              <span className="font-semibold">
                {meal.portion_size.substring(0, 20)}...
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {meal.ingredients}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Why Eat?</h2>
            <p className="text-gray-700 dark:text-gray-300">{meal.why_eat}</p>
          </div>
          <AddToCart meal={meal} />
          {/* <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold">
            Add to Cart
          </Button> */}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev: any) => (
            <div key={rev._id} className="border-b pb-6 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{rev.userName}</div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rev.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                {rev.comment}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No reviews yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Be the first to review this meal
            </p>
          </div>
        )}

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
          <AddReviewForm mealId={meal._id} />
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
