"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { addMeal } from "../redux/features/cartSlice";
import { Eye } from "lucide-react";

const FoodCard = ({ meal }: { meal: any }) => {
  const [hovered, setHovered] = useState(false);
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const handleAddProduct = (meal: any) => {
    const toastId = "creating";
    if (!user) {
      toast.error("Please log in to add items to the cart.", {
        id: toastId,
      });
      return;
    }

    if (user.role !== "customer") {
      toast.error("You are not allowed to add items to the cart.", {
        id: toastId,
      });
      return;
    }

    dispatch(addMeal(meal));
    toast.success("Successfully added to cart!", {
      id: toastId,
    });
  };

  return (
    <div
      className="relative h-80 rounded-xl overflow-hidden shadow-lg group bg-white dark:bg-gray-800 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={meal.imageUrls?.[0] || "/placeholder.png"}
        alt={meal.name || "Food Image"}
        width={256}
        height={320}
        className="w-full h-full object-cover transition duration-300"
        style={{
          filter: hovered ? "brightness(70%)" : "brightness(100%)",
        }}
      />

      <span className="absolute top-3 left-3 bg-green-400 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-md z-10">
        ${meal.price}
      </span>

      <span className="absolute top-3 right-3 bg-red-400 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md z-10">
        {meal.category || "Food"}
      </span>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => handleAddProduct(meal)}
            className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-green-400 hover:text-white transition-colors duration-200"
          >
            <FaCartPlus size={24} />
          </Button>
          <Link
            href={`/meals/${meal._id}`}
            className="hover:bg-green-400 text-white hover:text-white transition-colors duration-200 bg-opacity-90 rounded-full p-2 shadow-lg"
          >
            <Eye size={24} />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-8 pb-3 px-3"
      >
        <Link
          href={`/meals/${meal._id}`}
          className="text-white font-semibold text-lg mb-1 truncate"
        >
          {meal.name}
        </Link>
        <Link
          href={`/meals/${meal._id}`}
          className="flex items-center justify-between"
        >
          {/* <div className="text-white text-xs opacity-80">
            {meal.calories ? `${meal.calories} cal` : ""}
          </div> */}
          <div className="text-white text-xs opacity-80">
            {meal.portion_size || ""}
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default FoodCard;
