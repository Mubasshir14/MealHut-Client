/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  nameSelector,
  updateName,
} from "@/components/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";

import { Textarea } from "@/components/ui/textarea";

export default function Name() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(nameSelector);

  const handleName = (name: string) => {
    dispatch(updateName(name));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold text-red-400">Name</h1>
        <p className="text-green-400">Enter Your name</p>
        <div className="mt-2">
          <Textarea
            className="border-green-400 placeholder:text-gray-500"
            placeholder="Enter Your Name"
            onChange={(e) => handleName(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}
