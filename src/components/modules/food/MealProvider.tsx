/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createMealProvider } from "@/services/Food";
import { useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";

interface FormValues {
  mealProviderName: string;
  contactNumber: string;
  address: string;
  mealsOffered: string[];
  website: string;
  socialMediaLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  servicesOffered: string;
}

export default function MealProvider() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<FormValues>({
    defaultValues: {
      mealProviderName: "",
      contactNumber: "",
      address: "",
      mealsOffered: [],
      website: "",
      socialMediaLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
      servicesOffered: "",
    },
  });

  const mealCategories = [
    { value: "snacks", label: "Snacks" },
    { value: "desserts", label: "Desserts" },
    { value: "beverages", label: "Beverages" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten Free" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
    { value: "low-carb", label: "Low-Carb" },
    { value: "high-protein", label: "High-Protein" },
    { value: "intermittent-fasting", label: "Intermittent Fasting" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "dairy-free", label: "Dairy-Free" },
  ];

  const {
    formState: { isSubmitting },
  } = form;

  const toggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    form.setValue("mealsOffered", updatedCategories);
  };

  const onSubmit = async (data: FormValues) => {
    const toastId = "creating";
    const servicesOffered = data.servicesOffered;

    const modifiedData = {
      ...data,
      servicesOffered: servicesOffered,
      mealsOffered: selectedCategories,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("logo", imageFiles[0] as File);

      const res = await createMealProvider(formData);

     

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
        logout();
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-green-400 rounded-xl flex-grow max-w-2xl p-5 my-5 bg-white dark:bg-gray-900 shadow-lg">
      <div className="flex items-center space-x-4 mb-5">
        <h1 className="text-xl flex items-center justify-center font-semibold text-red-400">
          Be A Meal Provider
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* meal provider name */}
            <FormField
              control={form.control}
              name="mealProviderName"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">
                    Meal Provider Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-green-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* contact number */}
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">
                    Contact Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-green-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-green-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* website */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="text-green-400">Website</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-green-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-400">Facebook</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-green-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-400">Twitter</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-green-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-400">Instagram</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      className="border-green-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            {/* Meal Categories as Checkboxes */}
            <FormField
              control={form.control}
              name="mealsOffered"
              render={({ field }) => (
                <FormItem className="mb-3 flex flex-col">
                  <FormLabel className="text-green-400 mb-2">
                    Offered Meal Categories
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-2 text-green-400">
                    {mealCategories.map((category) => (
                      <div
                        key={category.value}
                        className="flex items-center space-x-2 text-green-400"
                      >
                        <Checkbox
                          id={`category-${category.value}`}
                          checked={selectedCategories.includes(category.value)}
                          onCheckedChange={() => toggleCategory(category.value)}
                        />
                        <Label
                          htmlFor={`category-${category.value}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-400"
                        >
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
            <div className="col-span-4 md:col-span-3">
              <FormField
                control={form.control}
                name="servicesOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-400">
                      Services Offered
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 border-green-400"
                        {...field}
                        value={field.value || ""}
                        placeholder="Enter Short Description That You Provide"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-8"
              />
            ) : (
              <div className="mt-8">
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Logo(400px X 400px)"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="mt-5 w-full bg-red-400 hover:bg-red-500 text-white"
          >
            {isSubmitting ? "Creating...." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
