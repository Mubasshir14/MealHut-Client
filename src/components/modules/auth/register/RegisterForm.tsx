/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/context/UserContext";
import { User, Mail, Lock, KeyRound, Phone, Map } from "lucide-react";

export default function RegisterForm() {
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const router = useRouter();

  const { setIsLoading } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
   
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 space-y-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-red-400 mb-2">Join Us</h1>
        <p className="text-gray-500">
          Create your account and start your journey
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Full Name
                </FormLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Email Address
                </FormLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                  </div>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Phone
                </FormLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="01XXXXXXXXXXX"
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                 Address
                </FormLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                  </div>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your Address"
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Password
                </FormLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Confirm Password
                </FormLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage className="text-red-500 text-sm mt-1">
                      Passwords do not match
                    </FormMessage>
                  ) : (
                    <FormMessage className="text-red-500 text-sm" />
                  )}
                </div>
              </FormItem>
            )}
          />

          <Button
            disabled={passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="w-full py-3 px-4 bg-red-400 hover:bg-red-500 text-white font-medium rounded-lg shadow transition-colors duration-200 mt-6"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-red-400 hover:text-red-500 transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
