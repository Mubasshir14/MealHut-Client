/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch } from "@/components/redux/hooks";
import { addMeal } from "@/components/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/context/UserContext";
import { toast } from "sonner";

interface AddToCartProps {
  meal: any;
}

const AddToCart: React.FC<AddToCartProps> = ({ meal }) => {
  const dispatch = useAppDispatch();


  
  const { user } = useUser();

  const handleAddProduct = () => {
    if (!user) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    if (user.role !== "customer") {
      toast.error("You are not allowed to add items to the cart.");
      return;
    }

    dispatch(addMeal({ ...meal}));
    toast.success("Successfully added to cart!");
   
  };

  return (
    <>
      <Button
        onClick={handleAddProduct}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg font-semibold"
      >
        Add to Cart
      </Button>

      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Specification</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter specifications..."
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
          />
          <Button onClick={handleAddProduct} className="w-full mt-4">
            Confirm & Add to Cart
          </Button>
        </DialogContent>
      </Dialog> */}
    </>
  );
};

export default AddToCart;
