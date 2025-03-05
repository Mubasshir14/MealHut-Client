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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updatemeal } from "@/services/Meal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UpdateFoodForm({ meal }: { meal: any }) {
  console.log(meal._id);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(
    meal?.imageUrls || []
  );
  const router = useRouter();

  const categories = [
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

  const form = useForm({
    defaultValues: {
      name: meal?.name || "",
      price: meal?.price || "",
      category: meal?.category || "",
      calories: meal?.calories || "",
      ingredients: meal?.ingredients || "",
      portion_size: meal?.portion_size || "",
      why_eat: meal?.why_eat || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
     const toastId = 'creating'
    const modifiedData = {
      ...data,
      price: parseFloat(data.price),
    };
    console.log("Update Modified", modifiedData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append("images", file);
    }

    try {
      console.log(meal._id);
      const res = await updatemeal(formData, meal?._id);
      console.log(res);
      if (res.success) {
        toast.success(res.message,{
          id: toastId
          
        });
        router.push("/mealProvider/dashboard/food/foods/manage-food");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-red-300 rounded-xl flex-grow max-w-2xl p-5 ">
      <div className="flex items-center space-x-4 mb-5 ">
        {/* <Logo /> */}

        <h1 className="text-xl text-green-400 text-center font-bold">
          Add Meal{" "}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-400">Name</FormLabel>
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-400">Price</FormLabel>
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-400">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select Product Category"
                          className="border-green-400"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-green-400">
                      {categories.map((category) => (
                        <SelectItem
                          key={category?.value}
                          value={category?.label}
                          className="text-green-400"
                        >
                          {category?.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-green-400">Calories</FormLabel>
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

          <div className="my-5">
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-green-400 font-bold text-xl">Description</p>
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-400">
                      Ingredients
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-26 resize-none border-green-400"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portion_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-400 mt-4">
                      Portion Size
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-26 resize-none border-green-400"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="why_eat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-green-400 mt-4">
                      Why To Eat?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-26 resize-none border-green-400"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-green-400 font-bold text-xl">Images</p>
            </div>
            <div className="flex gap-4 ">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Image"
                className="w-fit mt-0"
              />
              <ImagePreviewer
                className="flex flex-wrap gap-4 "
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-5 w-full bg-green-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Meal....." : "Update Meal"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
