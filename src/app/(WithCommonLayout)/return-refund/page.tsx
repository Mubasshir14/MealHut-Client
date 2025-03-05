import Link from "next/link";

const ReturnsRefunds = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-2xl w-full p-8 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-red-400 text-center mb-4">
          Returns & Refunds
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
          Due to the <span className="font-bold text-red-400">perishable nature</span> of food, we do not accept returns.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mt-4">
          However, if you receive a <span className="font-semibold text-red-400">wrong or damaged order</span>, please contact us within <span className="font-bold">24 hours</span> for a refund.
        </p>

        <div className="mt-6 flex justify-center">
          <Link href='/contact' className="px-6 py-3 text-lg font-medium rounded-xl bg-red-400 text-white shadow-md hover:bg-red-500 transition-all duration-300">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnsRefunds;
