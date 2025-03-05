/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createReview = async (data: {
  userName: string;
  mealId: string;
  rating: number;
  comment: string;
}) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify(data),
    });
    revalidateTag("Review");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleReview = async (mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review${mealId}`,
      {
        next: {
          tags: ["Review"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getReview = async (mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review/food?mealId=${mealId}`,
      {
        next: {
          tags: ["Review"],
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch reviews");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const getAllReview = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      next: {
        tags: ["Review"],
      },
    });

    if (!res.ok) throw new Error("Failed to fetch reviews");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};
