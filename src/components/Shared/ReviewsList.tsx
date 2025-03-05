import { Star } from "lucide-react";

type ReviewData = {
  _id: string;
  userName: string;
  mealId: string;
  rating: number;
  comment: string;
};

const ReviewsList = ({
  mealId,
  review,
}: {
  mealId: string;
  review: ReviewData[];
}) => {
  const filteredReviews = review.filter((rev) => rev.mealId === mealId);
  console.log(filteredReviews);
  return (
    <div className="space-y-6">
      {filteredReviews.length > 0 ? (
        filteredReviews.map((rev) => (
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
        <p className="text-gray-500">No reviews yet for this meal.</p>
      )}
    </div>
  );
};

export default ReviewsList;
