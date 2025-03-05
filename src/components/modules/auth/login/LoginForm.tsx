/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
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
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/components/context/UserContext";
import { Lock, Mail, LogIn } from "lucide-react";

export default function LoginForm() {
  const form = useForm();
  const { setIsLoading } = useUser();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 space-y-8 bg-white rounded-xl shadow-xl border border-gray-100">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-50 p-3 rounded-full">
            <LogIn className="h-8 w-8 text-red-400" />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-red-400 mb-2">Login</h2>
        <p className="text-gray-600">Welcome back! We've missed you.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-red-300" />
                  </div>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                 
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-red-300" />
                  </div>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-red-400 focus:border-red-400 transition-all duration-200"
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-3 px-4 bg-red-400 hover:bg-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                href="/register" 
                className="font-medium text-red-400 hover:text-red-500 hover:underline transition-colors duration-200"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}