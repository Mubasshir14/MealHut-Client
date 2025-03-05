/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createMealProvider = async (data: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-provider`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );
    revalidateTag("FOOD");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
