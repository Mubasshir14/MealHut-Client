"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllMeals = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meal`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single meals
export const getSingleMeal = async (mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal/${mealId}`,
      {
        next: {
          tags: ["MEAL"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add meal
export const addMeal = async (mealData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meal`, {
      method: "POST",
      body: mealData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("MEAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update meal
export const updatemeal = async (
  mealData: FormData,
  mealId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal/${mealId}`,
      {
        method: "PATCH",
        body: mealData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("MEAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// delete meal
export const deleteMeal = async (mealId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal/${mealId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("MEAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllMealProvider = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/meal-provider`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

