"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@/components/context/UserContext";
import { getAllOrders } from "@/services/cart";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ManageUserOrder = () => {
  const [orders, setOrders] = useState<any>([]);
  const { user } = useUser();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userId) {
        try {
          const orderData = await getAllOrders();
          const userOrders = orderData.data.filter(
            (order: any) => order?.user === user?.userId
          );
          setOrders(userOrders);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user?.userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-red-400">📦 Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Meal</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Item Price</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) =>
                order.meals.map((meal: any, index: number) => (
                  <tr key={`${order._id}-${index}`} className="border-t">
                    <td className="px-4 py-2 text-gray-700">{order._id}</td>
                    <td className="px-4 py-2 text-gray-700">{meal.name}</td>
                    <td className="px-4 py-2 text-gray-700">{order.name}</td>
                    <td className="px-4 py-2 text-center text-gray-700">{meal.quantity}</td>
                    <td className="px-4 py-2 text-gray-700">${meal.price.toFixed(2)}</td>
                    <td className="px-4 py-2 text-gray-700">${order.finalAmount.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <Image
                        width={64}
                        height={64}
                        src={meal.imageUrls[0]}
                        alt={meal.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded  text-sm ${
                          order.status === "Pending"
                            ? "border-yellow-500 border-2 text-yellow-500"
                            : order.status === "Processing"
                            ? "border-green-500 border-2 text-green-500"
                            : "border-red-500 border-2 text-red-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                          variant={"outline"}
                            className="border-green-400  text-green-400 rounded-lg"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-lg font-bold">Order Details</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                              <p><strong>User:</strong> {selectedOrder.name}</p>
                              <p><strong>Status:</strong> {selectedOrder.status}</p>
                              <p><strong>Total Price:</strong> ${selectedOrder.finalAmount.toFixed(2)}</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {selectedOrder.meals.map((meal: any) => (
                                  <div key={meal.name} className="flex items-center gap-4 p-2 border rounded-lg">
                                    <Image
                                      width={80}
                                      height={80}
                                      src={meal.imageUrls[0]}
                                      alt={meal.name}
                                      className="w-20 h-20 rounded-lg object-cover"
                                    />
                                    <div>
                                      <p><strong>{meal.name}</strong></p>
                                      <p>Quantity: {meal.quantity}</p>
                                      <p>Price: ${meal.price.toFixed(2)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUserOrder;
