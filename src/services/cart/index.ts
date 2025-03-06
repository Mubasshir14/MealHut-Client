/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrder } from "@/components/types/meal";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createOrder = async (order: IOrder) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    revalidateTag("ORDER");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value, 
      },
      next: {
        tags: ["ORDER"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching orders:", error.message);
    return Error(error.message);
  }
};


export const getSingleOrder = async (orderId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/${orderId}`,
      {
        next: {
          tags: ["ORDER"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateOrder = async (id: string, status: string) => {
  const allowedStatuses = ["Processing", "Cancelled"];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    revalidateTag("ORDER");
    const data = await res.json();
    return data;
  } catch (error: any) {
   
    Error(error.message);
  }
};
