/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUser } from "@/components/context/UserContext";
import { getAllOrders } from "@/services/cart";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Package, Truck, CheckCircle } from "lucide-react";

const TrackOrderByCustomer = () => {
  const { user } = useUser();
  const [orderId, setOrderId] = useState("");
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (user?.userId) {
        try {
          const orderData = await getAllOrders();
          const userSpecificOrders = orderData.data.filter(
            (order: any) => order?.user === user?.userId
          );
          setUserOrders(userSpecificOrders);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch orders. Please try again later.");
        }
      }
    };
    fetchData();
  }, [user?.userId]);

  const handleTrackOrder = () => {
    const foundOrder = userOrders.find((order) => order._id === orderId);
    if (foundOrder) {
      setOrderDetails(foundOrder);
      setError(null);
    } else {
      setOrderDetails(null);
      setError("Order not found. Please check the Order ID.");
    }
  };

  const getOrderProgress = (status: string) => {
    const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
    return ((statuses.indexOf(status) + 1) / statuses.length) * 100;
  };

  const renderOrderStatusIcon = (status: string) => {
    switch(status) {
      case "Pending":
        return <Package className="text-yellow-500 w-10 h-10" />;
      case "Processing":
        return <Truck className="text-red-500 w-10 h-10" />;
      case "Shipped":
        return <Truck className="text-purple-500 w-10 h-10" />;
      case "Delivered":
        return <CheckCircle className="text-green-500 w-10 h-10" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-2xl mt-10">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-green-600 mb-8">
        Track Your Order
      </h1>
      
      <div className="flex space-x-4 mb-6">
        <Input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="flex-1 p-4 text-lg rounded-xl border-2 focus:ring-2  transition-all duration-300"
        />
        <Button 
          onClick={handleTrackOrder} 
          className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Track Order
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {orderDetails ? (
        <Card className="bg-white border-2 border-red-100 rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="bg-red-50 py-4 px-6 border-b border-blue-100">
            <CardTitle className="text-2xl font-bold text-red-400 flex items-center gap-4">
              {renderOrderStatusIcon(orderDetails.status)}
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-medium">Order ID</p>
                <p className="text-lg font-bold text-blue-700">{orderDetails._id}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium">Total Price</p>
                <p className="text-lg font-bold text-green-700">${orderDetails.finalAmount.toFixed(2)}</p>
              </div>
            </div>
            
            <div>
              <p className="text-gray-600 font-medium mb-2">Order Status</p>
              <div className="flex items-center space-x-4">
                <span className={`text-xl font-bold ${
                  orderDetails.status === "Delivered" 
                    ? "text-green-600" 
                    : "text-yellow-600"
                }`}>
                  {orderDetails.status}
                </span>
              </div>
              <Progress 
                value={getOrderProgress(orderDetails.status)} 
                className="mt-3 h-3 bg-blue-100"
              />
            </div>

            {orderDetails.status === "Processing" && (
              <Alert className="bg-red-50 border-l-4 border-red-500 text-red-800">
                <AlertDescription>
                  Estimated Delivery: {Math.floor(Math.random() * 41) + 20} minutes
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
          <Package className="mx-auto mb-4 w-16 h-16 text-gray-300" />
          <p className="text-xl text-gray-500">Enter an order ID to view tracking details.</p>
        </div>
      )}
    </div>
  );
};

export default TrackOrderByCustomer;