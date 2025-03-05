import UpdateFoodForm from "@/components/modules/food/UpdateFoodForm";
import { getSingleMeal } from "@/services/Meal";

const UpdateFoodPage = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const { mealId } = await params;

  const { data: meal } = await getSingleMeal(mealId);

  return (
    <div className="flex justify-center items-center">
      <UpdateFoodForm meal={meal} />
    </div>
  );
};

export default UpdateFoodPage;
