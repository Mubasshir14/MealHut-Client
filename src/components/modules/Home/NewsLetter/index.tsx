"use client"
import React, { useState } from "react";
import { toast } from "sonner";

const NewsletterSignup = () => {
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
    <section id="newsletter-signup" className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full opacity-60 transform -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-100 rounded-full opacity-60 transform translate-x-20 translate-y-20"></div>
      <div className="absolute top-1/4 right-1/6 w-6 h-6 bg-red-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/6 w-8 h-8 bg-red-300 rounded-full opacity-40"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-block px-4 py-1 bg-red-50 text-red-400 rounded-full text-sm font-medium mb-4">Newsletter</span>
          <h2 className="text-4xl font-bold  text-red-400 mb-4">Stay Connected & Updated!</h2>
          <p className="text-lg text-gray-700 mb-2">
            Subscribe to our newsletter for exclusive offers, fitness tips, and health insights.
          </p>
          <p className="text-gray-600">
            Join our community of over 10,000 health enthusiasts.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-xl border border-gray-50">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-300 focus:border-red-400 transition duration-200"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-400 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:from-red-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Subscribe Now"
                    )}
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-500 pt-2">
                  <p>We respect your privacy. Unsubscribe at any time.</p>
                </div>
              </form>
              
              <div className="flex items-center justify-center mt-6 pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">Weekly Updates</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">Exclusive Offers</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">No Spam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;