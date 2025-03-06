/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import emptyCart from "@/assets/empty-cart.png";
import { useAppSelector } from "@/components/redux/hooks";
import { orderedMealsSelector } from "@/components/redux/features/cartSlice";
import CartProductCard from "./CartProductCard";

export default function CartProducts() {
  const meals = useAppSelector(orderedMealsSelector);


  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md p-10 space-y-5">
      {meals.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg text-red-400 uppercase font-semibold">
            Your cart is empty
          </p>

          <div className="flex justify-center items-center">
            <Image src={emptyCart} alt="empty cart" />
          </div>
        </div>
      )}
      {meals?.map((meal: any) => (
        <CartProductCard key={meal._id} product={meal} />
      ))}
    </div>
  );
}
