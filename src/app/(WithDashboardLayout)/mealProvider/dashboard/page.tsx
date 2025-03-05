/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
"use client";
import { useUser } from "@/components/context/UserContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function UserDashboard() {
  const { user } = useUser();
  console.log(user);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Orders",
        data: [50, 100, 75, 125, 150, 175],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: { raw: any; }) {
            return `Orders: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div className="mb-6 text-2xl font-semibold text-center  italic text-gray-800">
        Welcome <span className="text-red-400">{user?.name}</span> to your Meal Provider Dashboard
      </div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-medium text-gray-800">Total Orders</h3>
          <div className="text-3xl font-bold text-red-400">350</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-medium text-gray-800">Revenue</h3>
          <div className="text-3xl font-bold text-green-400">$12,500</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-medium text-gray-800">Active Users</h3>
          <div className="text-3xl font-bold text-green-400">120</div>
        </div> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-8 bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-medium text-gray-800 mb-4">Orders Trend</h3>
        <Line data={data} options={options} />
      </motion.div>
    </div>
  );
}
