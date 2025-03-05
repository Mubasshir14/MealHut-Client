import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="max-w-2xl w-full p-8 border border-gray-300  rounded-2xl shadow-lg bg-white  transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-red-400 text-center mb-4">
          Privacy Policy
        </h2>
        <p className="text-lg text-gray-600  text-center">
          Your privacy is important to us. This policy explains how{" "}
          <span className="font-semibold text-red-400">MealHut</span> collects, uses, and protects your data.
        </p>

        <div className="mt-6 space-y-4 text-gray-600 ">
          <div className="p-4 border-l-4 border-red-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-red-400">1. Information We Collect</h3>
            <p className="mt-1">
              We collect personal details such as name, email, phone number, and address to process your orders.
            </p>
          </div>

          <div className="p-4 border-l-4 border-red-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-red-400">2. How We Use Your Data</h3>
            <p className="mt-1">
              Your information is used to deliver meals, improve our service, and provide a personalized experience.
            </p>
          </div>

          <div className="p-4 border-l-4 border-red-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-red-400">3. Data Security</h3>
            <p className="mt-1">
              We implement security measures to protect your personal data. However, online data transmission is not 100% secure.
            </p>
          </div>

          <div className="p-4 border-l-4 border-red-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-red-400">4. Third-Party Sharing</h3>
            <p className="mt-1">
              We do not sell your data. However, we may share it with trusted partners to facilitate payments and delivery.
            </p>
          </div>

          <div className="p-4 border-l-4 border-red-400 bg-gray-100  rounded-lg">
            <h3 className="text-xl font-semibold text-red-400">5. Your Rights</h3>
            <p className="mt-1">
              You can request access, correction, or deletion of your personal data at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
