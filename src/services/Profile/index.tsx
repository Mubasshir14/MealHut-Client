"use server";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getProfile = async (): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProfile = async (formData: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

