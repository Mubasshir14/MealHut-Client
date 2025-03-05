/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Footer = () => {
  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      toast.success(
        "Thank you for subscribing! You'll receive updates on offers soon."
      );
      setEmail("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <footer className="bg-black text-gray-300 py-10 px-5">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-red-400 text-xl font-bold">
            Meal<span className="text-green-400">Box</span>
          </h2>
          <p className="mt-3 text-sm">
            Delicious, chef-crafted meals delivered to your door, ready to cook
            in minutes.
          </p>
          {/* Social Media Icons Placeholder */}
          <div className="flex gap-3 mt-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold border-b-2 border-red-500 pb-1 inline-block">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-red-400 hover:cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <div
                onClick={() => scrollToSection("about")}
                className="hover:text-red-400 hover:cursor-pointer"
              >
                About Us
              </div>
            </li>
            <li>
              <div
                onClick={() => scrollToSection("meal")}
                className="hover:text-red-400 hover:cursor-pointer"
              >
                Our Meals
              </div>
            </li>
            <li>
              <div
                onClick={() => scrollToSection("how-it-works")}
                className="hover:text-red-400 hover:cursor-pointer"
              >
                How It Works
              </div>
            </li>
            <li>
              <div
                onClick={() => scrollToSection("review")}
                className="hover:text-red-400 hover:cursor-pointer"
              >
                Testimonials
              </div>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white font-semibold border-b-2 border-red-500 pb-1 inline-block">
            Customer Support
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-red-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="shipping-information" className="hover:text-red-400">
                Shipping Information
              </Link>
            </li>
            <li>
              <Link href="return-refund" className="hover:text-red-400">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="/terms-condition" className="hover:text-red-400">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-white font-semibold border-b-2 border-red-500 pb-1 inline-block">
            Newsletter
          </h3>
          <p className="mt-3 text-sm">
            Subscribe to get special offers, free giveaways, and new recipe
            announcements.
          </p>
          <form onSubmit={handleSubmit} className="flex mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 rounded-l bg-gray-800 text-white focus:outline-none"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-500 px-4 py-2 rounded-r text-white font-semibold hover:bg-red-600 transition"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2023 MealBox. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="/privacy-policy" className="hover:text-red-400">
            Privacy Policy
          </a>
          <Link href="/terms-condition" className="hover:text-red-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
