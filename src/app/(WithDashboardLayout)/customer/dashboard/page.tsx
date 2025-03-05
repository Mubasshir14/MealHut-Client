/* eslint-disable react/no-unescaped-entities */
"use client";
import { useUser } from "@/components/context/UserContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function UserDashboard() {
  const { user } = useUser();

  const foodData = [
    { name: "Healthy Food (Fruits & Veggies)", value: 70, description: "Packed with vitamins, minerals, and fiber." },
    { name: "Fast Food (Burgers & Fries)", value: 15, description: "High in calories, low in nutritional value." },
    { name: "Processed Food (Canned, Packaged)", value: 15, description: "Contains preservatives, high sodium and sugar." },
  ];

  const COLORS = ["#4CAF50", "#FF5722", "#FFC107"];

  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold">
        👋 Welcome, {user?.name || "User"}!
      </h1>
      <p className="text-gray-600">Here’s a detailed overview of your food habits and health!</p>

      <div className="min-h-[50vh] rounded-xl bg-muted mt-6 p-6 shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={foodData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {foodData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">🍴 Food Categories and Their Impact:</h3>
        {foodData.map((item, index) => (
          <div key={index} className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">{item.name}</h4>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">👨‍⚕️ Doctor's Advice:</h3>
        <p className="text-gray-600">
          "Eating a balanced diet is essential for maintaining good health. Include more fruits and vegetables in your daily meals and reduce the intake of fast and processed foods."
        </p>
      </div>
    </div>
  );
}
