/* eslint-disable @typescript-eslint/no-explicit-any */
export const getAllMealProviders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-provider/mealProvider`
      ,{
        next: {
          tags: ["PROVIDER"],
        },
      });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleMealProviders = async (mealProvidersId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meal-provider/${mealProvidersId}`,
      {
        next: {
          tags: ["PROVIDER"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
