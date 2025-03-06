/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { deleteMeal, getAllMeals } from "@/services/Meal";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Eye, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useUser } from "@/components/context/UserContext";
import { useRouter } from "next/navigation";

const ManageMeal = () => {
    const router = useRouter();
  const [meals, setMeals] = useState<any[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [filteredMeals, setFilteredMeals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { user } = useUser();


  useEffect(() => {
    const fetchMeals = async () => {
      const toastId = 'creating'
      try {
        const { data } = await getAllMeals();
        const userMeals = data.filter(
          (meal: any) => meal.user === user?.userId
        );

        setMeals(userMeals);
        setFilteredMeals(userMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
        toast.error("Failed to load meals",{
          id: toastId
          
        });
      }
    };

    if (user?.userId) {
      fetchMeals();
    }
  }, [user?.userId]);

  useEffect(() => {
    const filtered = meals.filter((meal) =>
      meal.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMeals(filtered);
    setCurrentPage(1);
  }, [search, meals]);

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const currentMeals = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (mealId: string) => {
    const toastId = 'creating'
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await deleteMeal(mealId);
      if (res.success) {
        toast.success("The meal has been deleted.",{
          id: toastId
          
        });
      } else {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="lg:text-3xl text-red-400 font-bold mb-6 text-center">
        Manage Meal
      </h1>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="🔍 Search meals..."
          className="mb-4 w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Image</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Calories</TableHead>
              <TableHead className="font-semibold text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMeals.length > 0 ? (
              currentMeals.map((meal: any) => (
                <TableRow key={meal._id} className="hover:bg-gray-50">
                  <TableCell>
                    <Image
                      src={meal.imageUrls[0]}
                      alt={meal.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{meal.name}</TableCell>
                  <TableCell>${meal.price}</TableCell>
                  <TableCell>{meal.calories} kcal</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                       onClick={() =>
                        router.push(
                          `/meals/${meal._id}`
                        )
                      }
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-500 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>
                      <Button
                       onClick={() =>
                        router.push(
                          `/mealProvider/dashboard/food/foods/update-food/${meal._id}`
                        )
                      }
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-500 hover:bg-amber-50"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(meal._id)}
                        className="border-red-400 text-red-400 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No meals found. Please try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`border-red-400 text-green-400 hover:bg-red-100 px-3 py-1 rounded-md ${
                    currentPage === index + 1 ? "bg-red-400 text-white" : ""
                  }`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader className="text-lg font-semibold">
            Are you sure you want to delete this meal?
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive">Yes, Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMeal;
