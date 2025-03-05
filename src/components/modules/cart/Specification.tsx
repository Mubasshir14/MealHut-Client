"use client";

import {
  specificationSelector,
  updateSpecification,
} from "@/components/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";

import { Textarea } from "@/components/ui/textarea";

export default function Specification() {
  const dispatch = useAppDispatch();
  const specification = useAppSelector(specificationSelector);
  console.log(specification);
  const handleSpecification = (specification: string) => {
    dispatch(updateSpecification(specification));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold text-red-400">Specification</h1>
        <p className=" text-green-400">Enter your Specification</p>
        <div className="mt-2">
          <Textarea
            className="border-green-400 placeholder:text-gray-500"
            placeholder="Enter Your Specification What You Want"
            onChange={(e) => handleSpecification(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}
