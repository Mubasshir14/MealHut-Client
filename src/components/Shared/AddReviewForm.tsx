"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { createReview } from "@/services/Review";
type ReviewData = {
  userName: string; mealId: string; rating: number; comment: string;
}
const AddReviewForm = ({ mealId }: { mealId: string }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useUser();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   if (!user) {
  //     toast.error("Please log in before submitting a review.");
  //     return;
  //   }
  
  //   if (user.role !== "customer") {
  //     toast.error("You are not allowed to submit a review.");
  //     return;
  //   }
  
  //   try {
    
  //     const formData = new FormData();
  //     formData.append("userName", user?.name || "");
  //     formData.append("mealId", mealId);
  //     formData.append("rating", rating.toString());
  //     formData.append("comment", comment);
  
  //     const reviewData: ReviewData = {
  //       userName: formData.get("userName") as string,
  //       mealId: formData.get("mealId") as string,
  //       rating: parseInt(formData.get("rating") as string, 10),
  //       comment: formData.get("comment") as string,
  //     };
  
  //     const response = await createReview(reviewData);
  
  //     if (response.success) {
  //       toast.success("Review submitted successfully!");
  //       setRating(0);
  //       setComment("");
  //     } else {
  //       toast.error(response.message || "Failed to submit review.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     toast.error("Something went wrong. Please try again.");
  //   }
  // };
  
  const handleSubmit = async (e: React.FormEvent) => {
    const toastId = 'creating'
    e.preventDefault();
  
    if (!user) {
      toast.error("Please log in before submitting a review.",{
        id: toastId
        
      });
      return;
    }
  
    if (user.role !== "customer") {
      toast.error("You are not allowed to submit a review.",{
        id: toastId
        
      });
      return;
    }
  
    try {
      
      const reviewData: ReviewData = {
        userName: user?.name || "",
        mealId,
        rating,
        comment,
      };
  
      console.log("Review Data Sent:", reviewData);  
  
      const response = await createReview(reviewData);
  
      if (response.success) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setComment("");
      } else {
        toast.error(response.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star Rating */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="space-y-2">
        <label htmlFor="comment" className="block text-sm font-medium">
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Share your experience with this meal..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-green-500 hover:bg-green-600"
        disabled={rating === 0 || !comment.trim()}
      >
        Submit Review
      </Button>
    </form>
  );
};

export default AddReviewForm;
