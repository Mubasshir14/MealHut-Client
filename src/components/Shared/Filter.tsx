"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { getAllMeals } from "@/services/Meal";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaCartPlus, FaFilter } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Eye, Loader2, Search, X } from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { addMeal } from "../redux/features/cartSlice";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

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

interface Meal {
  _id: string;
  name: string;
  image: string;
  imageUrls?: string[];
  price: number;
  category: string;
  rating: number;
  portion_size?: string;
  [key: string]: any;
}

const Filter = ({ review }: { review: any }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const limit = 9;

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllMeals();

      if (response && response.data) {
        setMeals(response.data);
      } else {
        setError("Invalid response format from API");
        setMeals([]);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      setError("Failed to load meals. Please try again later.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedRatings, searchText]);

  const groupedReviews = review.reduce(
    (acc: any, rev: { mealId: string; rating: number }) => {
      if (!acc[rev.mealId]) {
        acc[rev.mealId] = [];
      }
      acc[rev.mealId].push(rev.rating);
      return acc;
    },
    {}
  );

  const mealAverageRatings = Object.keys(groupedReviews).map((mealId) => {
    const ratings = groupedReviews[mealId];
    const totalRating = ratings.reduce(
      (sum: number, rating: number) => sum + rating,
      0
    );
    const AVERAGERating = Math.round(totalRating / ratings.length);
    return { mealId, AVERAGERating };
  });

  const filteredMeals = meals.filter((meal) => {
    // Category filter
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(meal.category);

    // Rating filter
    const ratingMatch =
      selectedRatings.length === 0 ||
      selectedRatings.includes(
        mealAverageRatings.find((avgRating) => avgRating.mealId === meal._id)
          ?.AVERAGERating || 0
      );

    // Search text filter (flexible matching)
    const searchMatch =
      searchText.trim() === "" ||
      meal.name.toLowerCase().includes(searchText.toLowerCase()) ||
      meal.category.toLowerCase().includes(searchText.toLowerCase()) ||
      meal.portion_size?.toLowerCase().includes(searchText.toLowerCase());

    return categoryMatch && ratingMatch && searchMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredMeals.length / limit));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentMeals = filteredMeals.slice(startIndex, endIndex);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSearchText("");
    setCurrentPage(1);
    setHasSearched(false);
    setIsFilterOpen(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const { user } = useUser();
  const dispatch = useAppDispatch();
  const handleAddProduct = (meal: any) => {
    if (!user) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    if (user.role !== "customer") {
      toast.error("You are not allowed to add items to the cart.");
      return;
    }

    dispatch(addMeal(meal));
    toast.success("Successfully added to cart!");
  };

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <Label className="text-xl font-bold mb-4 block">Search Meals</Label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search meals, categories..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setHasSearched(true);
            }}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <h3 className="text-xl font-bold mb-4">Filter By Category</h3>
        <div className="grid grid-cols-1 gap-2">
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

      {/* Rating Filters */}
      <div>
        <h3 className="text-xl font-bold mb-4">Filter By Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingToggle(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none flex items-center"
              >
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <Button
        variant="destructive"
        onClick={clearFilters}
        className="w-full mt-4"
        disabled={
          selectedCategories.length === 0 &&
          selectedRatings.length === 0 &&
          searchText.trim() === ""
        }
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto py-10 relative">
      {/* Mobile Hamburger Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="bg-red-400 text-white hover:bg-red-500"
        >
          <FaBars size={24} />
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100]">
          <div className="fixed left-0 top-0 bottom-0 w-3/4 bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            <FilterSection />
          </div>
        </div>
      )}
      {/* Desktop Filter Section */}
      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:block w-1/4 px-4 py-6 bg-gray-100 rounded-lg mr-4">
          <FilterSection />
        </div>
        <div className="w-full lg:w-3/4 px-4 py-6">
        <h2 className="text-3xl font-bold text-center text-red-400 mb-6">
          Our Delicious Meals 🍽️
        </h2>

        {hasSearched && !loading && (
          <div className="mb-4 text-gray-600 text-sm text-center">
            <p>
              Showing{" "}
              {filteredMeals.length > 0
                ? `${startIndex + 1}-${Math.min(
                    endIndex,
                    filteredMeals.length
                  )} of ${filteredMeals.length}`
                : "0"}{" "}
              results
            </p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-64 bg-red-50 rounded-lg">
            <div className="text-center text-red-500">
              <p>{error}</p>
              <Button
                variant="outline"
                onClick={fetchMeals}
                className="mt-4 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {loading && !error && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4 text-red-400" />
              <p>Loading meals...</p>
            </div>
          </div>
        )}

        {/* No Results Found Section */}
        {!loading && filteredMeals.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-10 text-center">
            <Image
              src="/api/placeholder/400/300"
              alt="No Results Found"
              width={400}
              height={300}
              className="opacity-50 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">
              No Meals Found
            </h2>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters to find what you are looking
              for.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentMeals.map((meal) => (
            <div
              key={meal._id}
              className="relative h-80 rounded-xl overflow-hidden shadow-lg group bg-white dark:bg-gray-800 cursor-pointer"
              onMouseEnter={() => setHovered(meal._id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={meal.imageUrls?.[0] || "/placeholder.png"}
                alt={meal.name || "Food Image"}
                width={256}
                height={320}
                className="w-full h-full object-cover transition duration-300"
                style={{
                  filter:
                    hovered === meal._id
                      ? "brightness(70%)"
                      : "brightness(100%)",
                }}
              />

              <span className="absolute top-3 left-3 bg-green-400 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-md z-10">
                ${meal.price}
              </span>

              <span className="absolute top-3 right-3 bg-red-400 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md z-10">
                {meal.category || "Food"}
              </span>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hovered === meal._id ? 1 : 0,
                  scale: hovered === meal._id ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="items-center flex justify-center gap-4">
                  <Button
                    onClick={() => handleAddProduct(meal)}
                    className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-green-400 hover:text-white transition-colors duration-200"
                  >
                    <FaCartPlus size={24} />
                  </Button>
                  <Link
                    href={`/meals/${meal._id}`}
                    className="hover:bg-green-400 text-white hover:text-white transition-colors duration-200 bg-opacity-90 rounded-full p-2 shadow-lg"
                  >
                    <Eye size={24} />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-8 pb-3 px-3"
              >
                <Link
                  href={`/meals/${meal._id}`}
                  className="text-white font-semibold text-lg mb-1 truncate block"
                >
                  {meal.name}
                </Link>
                <div className="flex items-center justify-between">
                  <div className="text-white text-xs opacity-80">
                    {meal.portion_size || ""}
                  </div>
                  <div className="flex items-center">
                    {[
                      ...Array(
                        Math.round(
                          mealAverageRatings.find((r) => r.mealId === meal._id)
                            ?.AVERAGERating || 0
                        )
                      ),
                    ].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex justify-center  mt-6">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className=""
          >
            Previous
          </Button>
          <div className="text-center mx-4 text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className=""
          >
            Next
          </Button>
        </div>
      </div>
      </div>

      {/* Mobile Filter Button and Sheet */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              className="rounded-full p-3 shadow-lg bg-red-400 hover:bg-red-500"
            >
              <FaFilter size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[90vh] rounded-t-2xl p-6 overflow-y-auto"
          >
            <SheetHeader className="mb-4">
              <SheetTitle className="text-2xl font-bold">
                Filter & Search
              </SheetTitle>
            </SheetHeader>
            <FilterSection />
          </SheetContent>
        </Sheet>
      </div>

      {/* Meals Section */}
      {/* <div className="w-full lg:w-3/4 px-4 py-6">
        <h2 className="text-3xl font-bold text-center text-red-400 mb-6">
          Our Delicious Meals 🍽️
        </h2>

        {hasSearched && !loading && (
          <div className="mb-4 text-gray-600 text-sm text-center">
            <p>
              Showing{" "}
              {filteredMeals.length > 0
                ? `${startIndex + 1}-${Math.min(
                    endIndex,
                    filteredMeals.length
                  )} of ${filteredMeals.length}`
                : "0"}{" "}
              results
            </p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-64 bg-red-50 rounded-lg">
            <div className="text-center text-red-500">
              <p>{error}</p>
              <Button
                variant="outline"
                onClick={fetchMeals}
                className="mt-4 border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {loading && !error && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="animate-spin h-8 w-8 mx-auto mb-4 text-red-400" />
              <p>Loading meals...</p>
            </div>
          </div>
        )}

     
        {!loading && filteredMeals.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-10 text-center">
            <Image
              src="/api/placeholder/400/300"
              alt="No Results Found"
              width={400}
              height={300}
              className="opacity-50 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">
              No Meals Found
            </h2>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filters to find what you are looking
              for.
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {currentMeals.map((meal) => (
            <div
              key={meal._id}
              className="relative h-80 rounded-xl overflow-hidden shadow-lg group bg-white dark:bg-gray-800 cursor-pointer"
              onMouseEnter={() => setHovered(meal._id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={meal.imageUrls?.[0] || "/placeholder.png"}
                alt={meal.name || "Food Image"}
                width={256}
                height={320}
                className="w-full h-full object-cover transition duration-300"
                style={{
                  filter:
                    hovered === meal._id
                      ? "brightness(70%)"
                      : "brightness(100%)",
                }}
              />

              <span className="absolute top-3 left-3 bg-green-400 text-white text-sm font-bold px-3 py-1 rounded-lg shadow-md z-10">
                ${meal.price}
              </span>

              <span className="absolute top-3 right-3 bg-red-400 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md z-10">
                {meal.category || "Food"}
              </span>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hovered === meal._id ? 1 : 0,
                  scale: hovered === meal._id ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="items-center flex justify-center gap-4">
                  <Button
                    onClick={() => handleAddProduct(meal)}
                    className="bg-white bg-opacity-90 rounded-full p-4 shadow-lg flex items-center justify-center hover:bg-green-400 hover:text-white transition-colors duration-200"
                  >
                    <FaCartPlus size={24} />
                  </Button>
                  <Link
                    href={`/meals/${meal._id}`}
                    className="hover:bg-green-400 text-white hover:text-white transition-colors duration-200 bg-opacity-90 rounded-full p-2 shadow-lg"
                  >
                    <Eye size={24} />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-8 pb-3 px-3"
              >
                <Link
                  href={`/meals/${meal._id}`}
                  className="text-white font-semibold text-lg mb-1 truncate block"
                >
                  {meal.name}
                </Link>
                <div className="flex items-center justify-between">
                  <div className="text-white text-xs opacity-80">
                    {meal.portion_size || ""}
                  </div>
                  <div className="flex items-center">
                    {[
                      ...Array(
                        Math.round(
                          mealAverageRatings.find((r) => r.mealId === meal._id)
                            ?.AVERAGERating || 0
                        )
                      ),
                    ].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="flex justify-center  mt-6">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className=""
          >
            Previous
          </Button>
          <div className="text-center mx-4 text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className=""
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Filter;
