"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getAllMeals } from "@/services/Meal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Search, Frown, Menu, X } from "lucide-react";
import { Rings } from "react-loading-icons";
import FoodCard from "./FoodCard";

const categories = [
  { value: "snacks", label: "Snacks" },
  { value: "desserts", label: "Desserts" },
  { value: "beverages", label: "Beverages" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "keto", label: "Keto" },
  { value: "paleo", label: "Paleo" },
  { value: "low-carb", label: "Low-Carb" },
  { value: "high-protein", label: "High-Protein" },
  { value: "intermittent-fasting", label: "Intermittent Fasting" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "dairy-free", label: "Dairy-Free" },
];

const AllFoodCardWithSidebar = () => {
  const [meals, setMeals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const limit = 9;

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAllMeals();
      if (data && data.length > 0) {
        setMeals(data);
      } else {
        setError("No meals available at the moment.");
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      setError("Failed to fetch meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchText("");
    setCurrentPage(1);
    setIsSidebarOpen(false);
  };

  const filteredMeals = meals.filter((meal) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(meal.category);

    const searchMatch =
      searchText.trim() === "" ||
      meal.name.toLowerCase().includes(searchText.toLowerCase()) ||
      meal.category.toLowerCase().includes(searchText.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredMeals.length / limit);
  const currentMeals = filteredMeals.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const SidebarContent = () => (
    <div className="w-full  px-4 py-6 bg-gray-100 rounded-lg">
      <div className="mb-6">
        <Label className="text-xl font-bold mb-4 block">Search Meals</Label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search meals, categories..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Filter By Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={selectedCategories.includes(category.label)}
                onCheckedChange={() => handleCategoryToggle(category.label)}
              />
              <Label
                htmlFor={`category-${category.value}`}
                className="text-sm font-medium leading-none"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="destructive"
        onClick={clearFilters}
        className="w-full mt-4"
        disabled={selectedCategories.length === 0 && searchText.trim() === ""}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden flex justify-between items-center px-4 mb-4">
        <h2 className="text-2xl font-bold text-red-400">
          Our Delicious Meals 🍽️
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-4/5 max-w-md bg-white h-full overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {SidebarContent()}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">{SidebarContent()}</div>

        {/* Meals Content */}
        <div className="w-full lg:w-3/4 px-4 py-6">
          <h2 className="hidden lg:block text-3xl font-bold text-center text-red-400 mb-6">
            Our Delicious Meals 🍽️
          </h2>

          {loading ? (
            <div className="flex justify-center items-center min-h-screen py-20">
              <Rings stroke="red" width={60} height={60} />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
              <Frown className="text-red-400 w-20 h-20 mb-4" />
              <h3 className="text-2xl font-semibold text-red-500 mb-2">
                {error}
              </h3>
              <p className="text-gray-600 mb-4">
                We could not find any meals right now.
              </p>
              <Button
                onClick={fetchMeals}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              >
                Try Again
              </Button>
            </div>
          ) : currentMeals.length === 0 ? (
            <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
              <Frown className="text-red-400 w-20 h-20 mb-4" />
              <h3 className="text-2xl font-semibold text-red-500 mb-2">
                No Meals Found
              </h3>
              <p className="text-gray-600 mb-4">
                Your search or selected filters did not match any meals.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-2">
                {currentMeals?.map((meal: any) => (
                  <FoodCard key={meal._id} meal={meal} />
                ))}
              </div>

              {/* Pagination Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-full sm:w-auto"
                >
                  Previous
                </Button>
                <div className="text-center text-lg font-semibold">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-full sm:w-auto"
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFoodCardWithSidebar;
