/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/components/context/UserContext";
import {
  clearCart,
  grandTotalSelector,
  orderedMealsSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  specificationSelector,
  subTotalSelector,
} from "@/components/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/services/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  console.log("order in the payment", order);
  console.log("order in the length", order?.meals?.length);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const specification = useAppSelector(specificationSelector);
  const cartProducts = useAppSelector(orderedMealsSelector);

  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // const handleOrder = async () => {
  //   const orderLoading = toast.loading("Order is being placed");
  //   try {
  //     if (!user.user) {
  //       router.push("/login");
  //       throw new Error("Please login first.");
  //     }

  //     if (!shippingAddress) {
  //       throw new Error("Shipping address is missing");
  //     }

  //     if (cartProducts.length === 0) {
  //       throw new Error("Cart is empty, what are you trying to order ??");
  //     }

  //     const updatedOrder = {
  //       ...order,
  //       specification,
  //       shippingAddress,
  //     };
  //     console.log(updatedOrder);
  //     const res = await createOrder(updatedOrder);
  //     console.log(res);
  //     if (res.success) {
  //       toast.success(res.message, { id: orderLoading });
  //       dispatch(clearCart());
  //       router.push("/customer/dashboard");
  //     }

  //     if (!res.success) {
  //       toast.error(res.message, { id: orderLoading });
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message, { id: orderLoading });
  //   }
  // };
  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");

    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first.");
      }

      if (!shippingAddress) {
        throw new Error("Shipping address is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      const mealProviderId = order?.meals[0]?.mealProvider;
      const allMealsSameProvider = order?.meals.every(
        (meal) => meal.mealProvider === mealProviderId
      );

      if (!allMealsSameProvider) {
        toast.error(
          "You cannot make an order from different providers at a time.",
          { id: orderLoading }
        );
        return;
      }

      const updatedOrder = {
        ...order,
        specification,
        shippingAddress,
      };

      const res = await createOrder(updatedOrder);

      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        router.push("/customer/dashboard");
      } else {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold  text-red-400">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-green-400 ">Subtotal</p>
          <p className="font-semibold text-green-400">
            $ {subTotal.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-green-400 ">Shipment Cost</p>
          <p className="font-semibold text-green-400">
            $ {shippingCost.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-green-400 ">Grand Total</p>
        <p className="font-semibold text-green-400">
          $ {grandTotal.toFixed(2)}
        </p>
      </div>

      <Button
        variant={"outline"}
        onClick={handleOrder}
        className="w-full  bg-red-400 text-xl text-white font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
