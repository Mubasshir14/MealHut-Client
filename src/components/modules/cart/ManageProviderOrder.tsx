"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useUser } from "@/components/context/UserContext";
import { getAllOrders, updateOrder } from "@/services/cart";
import { getAllMeals } from "@/services/Meal";
import { getAllMealProviders } from "@/services/MealProviders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";

const ManageProviderOrder = () => {
  const [orders, setOrders] = useState<any>([]);
  const [mealProvides, setMealProvides] = useState<any>([]);
  const [meals, setMeals] = useState<any>([]);
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userId) {
        try {
          const orderData = await getAllOrders();
          const { data: mealProviderData } = await getAllMealProviders();
          const { data: mealData } = await getAllMeals();

          setOrders(orderData.data);
          setMealProvides(mealProviderData);
          setMeals(mealData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user?.userId]); 

  const matchingMealProvider = mealProvides.find(
    (provider: any) => provider.user === user?.userId
  );

  const filteredOrders = orders
    ?.filter((order: any) => order?.mealProvider === matchingMealProvider?._id)
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
console.log(filteredOrders);
  const openModal = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    const toastId = "updateOrderToast";
    try {
      await updateOrder(id, status);
      toast.success(`Order successfully ${status.toLowerCase()}`, {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to update order status", {
        id: toastId,
      });
    }
  };


  const isDisabled = (status: string) => {
    return status === "Processing" || status === "Cancelled";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="lg:text-3xl text-red-400 font-bold mb-6 text-center">
        Manage Orders
      </h1>

      <Table className="border-separate border-spacing-2">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Meal Name</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredOrders?.map((order: any) =>
            order?.meals?.map((mealItem: any, index: number) => (
              <TableRow
                key={`${order?._id}-${index}`}
                className="border border-gray-300 bg-gray-100 transition-all duration-300"
              >
                <TableCell className="text-sm font-medium">{order?._id}</TableCell>
                <TableCell className="text-sm font-medium">{mealItem?.name}</TableCell>
                <TableCell className="text-sm font-medium">{order?.name}</TableCell>
                <TableCell>
                  <Image
                    src={mealItem?.imageUrls?.[0]}
                    alt={mealItem?.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                    height={64}
                    width={64}
                  />
                </TableCell>
                <TableCell className="text-sm font-medium">{order.status}</TableCell>
                <TableCell className="text-sm font-medium">{mealItem.quantity}</TableCell>
                <TableCell className="text-sm font-medium">${order.totalAmount}</TableCell>
                <TableCell className=" flex flex-col items-center justify-center">
                  <Button
                    variant="outline"
                    className="mr-2 py-1 px-3 text-xs border-red-400 text-red-400 mb-2"
                    onClick={() => openModal(order)}
                  >
                    View
                  </Button>
                  <div className="flex flex-col items-center space-y-2">
                    <Button
                      disabled={isDisabled(order.status)}
                      onClick={() =>
                        handleStatusUpdate(order._id, "Processing")
                      }
                      variant="outline"
                      className="py-1 px-3 text-xs border-green-400 text-green-400"
                    >
                      Update
                    </Button>
                    <Button
                      disabled={isDisabled(order.status)}
                      onClick={() =>
                        handleStatusUpdate(order._id, "Cancelled")
                      }
                      variant="outline"
                      className="py-1 px-3 text-xs border-red-400 text-red-400"
                    >
                      Cancel
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white border-2 border-red-500 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div>
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Customer Name:</strong> {selectedOrder.name}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Total Price:</strong> ${selectedOrder.totalAmount}</p>
              <p><strong>Specification:</strong> {selectedOrder.specification}</p>
              <h3 className="mt-4 font-medium">Meals:</h3>
              {selectedOrder?.meals?.map((meal: any, index: number) => (
                <div key={index} className="mb-2">
                  <p><strong>Meal:</strong> {meal?.name}</p>
                  <p><strong>Quantity:</strong> {meal?.quantity}</p>
                  <Image
                    src={meal?.imageUrls?.[0]}
                    alt={meal?.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                    height={64}
                    width={64}
                  />
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full bg-red-400 border-2 text-white"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProviderOrder;
