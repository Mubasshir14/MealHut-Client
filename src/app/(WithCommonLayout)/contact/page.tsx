/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    toast.success("Your message has been sent successfully!");
    reset();
  };

  return (
    <div className="max-w-screen-xl mx-auto flex items-center justify-center min-h-screen px-4">
      <div className="max-w-lg w-full p-8 border rounded-2xl shadow-xl bg-white  transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-red-400 mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          We’d love to hear from you! Fill out the form below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <div>
            <Input
              placeholder="Your Name"
              className=" "
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Your Email"
              type="email"
              className=""
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Your Message"
              className=""
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message as string}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-lg font-medium bg-red-400 hover:opacity-90 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
