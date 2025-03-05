"use client";

import {
  shippingAddressSelector,
  updateShippingAddress,
} from "@/components/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";

import { Textarea } from "@/components/ui/textarea";

export default function Address() {
  const dispatch = useAppDispatch();
  const shippingAddress = useAppSelector(shippingAddressSelector);
  console.log(shippingAddress);
  const handleShippingAddress = (address: string) => {
    dispatch(updateShippingAddress(address));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold text-red-400">Address</h1>
        <p className="text-green-400">Enter Your Address.</p>
        <div className="mt-2">
          <Textarea
          className="border-green-400 placeholder:text-gray-500"
            placeholder="Enter Your Shipping Address"
            onChange={(e) => handleShippingAddress(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}
