"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    imageUrl: "https://i.pravatar.cc/40",
    text: "The food from MealHut is absolutely amazing! The Grilled Salmon Bowl was so fresh and flavorful, highly recommend!",
    rating: 5
  },
  {
    id: 2,
    name: "Jane Smith",
    imageUrl: "https://i.pravatar.cc/40",
    text: "Vegetarian Buddha Bowl is a must-try! Packed with flavor and very satisfying. I’ll definitely order again.",
    rating: 4
  },
  {
    id: 3,
    name: "Michael Brown",
    imageUrl: "https://i.pravatar.cc/40",
    text: "The Chocolate Lava Cake was to die for! Warm, gooey, and just perfect. MealHut nailed it.",
    rating: 5
  },
  {
    id: 4,
    name: "Sara Lee",
    imageUrl: "https://i.pravatar.cc/40",
    text: "I tried the Mediterranean Salad, and it was light and refreshing. A perfect choice for a healthy meal.",
    rating: 4
  },
  {
    id: 5,
    name: "David Green",
    imageUrl: "https://i.pravatar.cc/40",
    text: "The Shrimp Pasta was rich in flavor with the perfect balance of garlic and shrimp. I highly recommend it.",
    rating: 5
  }
];

const ReviewSection = () => {
  return (
    <section id='review' className="py-16 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-red-400 mb-8">What Our Customers Say</h2>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500 }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="bg-gray-50 p-6 rounded-lg shadow-lg border-2 border-green-300">
              <div className="flex items-center justify-center mb-4">
                <Image
                  src={review.imageUrl}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  width={64}
                  height={64}
                />
                <div>
                  <h3 className="text-xl font-semibold text-green-400">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)]?.map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-400"
                      >
                        <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                      </svg>
                    ))}
                    {[...Array(5 - review.rating)]?.map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-gray-300"
                      >
                        <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">{review?.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
