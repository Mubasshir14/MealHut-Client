import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IMeal } from "@/components/types/meal";

export interface CartMeal extends IMeal {
  orderQuantity: number;
}

interface InitialState {
  meals: CartMeal[];
  specification?: string;
  shippingAddress: string;
  mealProvider: string;
  name: string;
}

const initialState: InitialState = {
  meals: [],
  specification: "",
  shippingAddress: "",
  mealProvider: "",
  name: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMeal: (state, action) => {
      if (state.meals.length === 0) {
        state.mealProvider = action.payload.mealProvider;
      }

      const mealToAdd = state.meals.find(
        (meal) => meal._id === action.payload._id
      );

      if (mealToAdd) {
        mealToAdd.orderQuantity += 1;
        return;
      }

      state.meals.push({
        _id: action.payload._id,
        name: action.payload.name,
        imageUrls: action.payload.imageUrls,
        price: action.payload.price,
        calories: action.payload.calories,
        category: action.payload.category,
        mealProvider: action.payload.mealProvider,
        user: action.payload.user,
        isActive: action.payload.isActive,
        ingredients: action.payload.ingredients,
        portion_size: action.payload.portion_size,
        why_eat: action.payload.why_eat,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        __v: action.payload.__v,
        orderQuantity: 1,
      });
    },
    incrementOrderQuantity: (state, action) => {
      const mealToIncrement = state.meals.find(
        (meal) => meal._id === action.payload
      );

      if (mealToIncrement) {
        mealToIncrement.orderQuantity += 1;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const mealToDecrement = state.meals.find(
        (meal) => meal._id === action.payload
      );

      if (mealToDecrement && mealToDecrement.orderQuantity > 1) {
        mealToDecrement.orderQuantity -= 1;
      }
    },
    removeMeal: (state, action) => {
      state.meals = state.meals.filter((meal) => meal._id !== action.payload);
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateSpecification: (state, action) => {
      state.specification = action.payload;
    },
    clearCart: (state) => {
      state.meals = [];
      state.shippingAddress = "";
      state.mealProvider = "";
      state.name = "";
    },
  },
});

//* Selectors
export const orderedMealsSelector = (state: RootState) => state.cart.meals;

export const orderSelector = (state: RootState) => ({
  meals: state.cart.meals.map((meal) => ({
    meal: meal._id,
    name: meal.name,
    imageUrls: meal.imageUrls,
    price: meal.price,
    calories: meal.calories,
    category: meal.category,
    mealProvider: meal.mealProvider,
    isActive: meal.isActive,
    ingredients: meal.ingredients,
    portion_size: meal.portion_size,
    why_eat: meal.why_eat,
    createdAt: meal.createdAt,
    updatedAt: meal.updatedAt,
    quantity: meal.orderQuantity,
  })),
  mealProvider: state.cart.mealProvider,
  shippingAddress: state.cart.shippingAddress,
  specification: state.cart.specification,
  name: state.cart.name,
});

// export const orderSelector = (state: RootState) => ({
//   meals: state.cart.meals.map((meal) => ({
//     meal: {  // Send the entire meal object, not just the _id
//       meal: meal._id,
//       name: meal.name,
//       imageUrls: meal.imageUrls,
//       price: meal.price,
//       calories: meal.calories,
//       category: meal.category,
//       mealProvider: meal.mealProvider,
//       isActive: meal.isActive,
//       ingredients: meal.ingredients,
//       portion_size: meal.portion_size,
//       why_eat: meal.why_eat,
//       createdAt: meal.createdAt,
//       updatedAt: meal.updatedAt,
//     },
//     quantity: meal.orderQuantity,
//     mealProvider: meal.mealProvider,
//   })),
//   mealProvider: state.cart.mealProvider,
//   shippingAddress: state.cart.shippingAddress,
//   specification: state.cart.specification,
// });

export const providerSelector = (state: RootState) => state.cart.mealProvider;

export const shippingCostSelector = () => 60;

export const subTotalSelector = (state: RootState) =>
  state.cart.meals.reduce(
    (total: number, meal) => total + meal.price * meal.orderQuantity,
    0
  );

export const discountAmountSelector = () => 0;

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector();
  const discountAmount = discountAmountSelector();
  return subTotal - discountAmount + shippingCost;
};

export const shippingAddressSelector = (state: RootState) =>
  state.cart.shippingAddress;

export const nameSelector = (state: RootState) => state.cart.name;

export const specificationSelector = (state: RootState) =>
  state.cart.specification;

export const {
  addMeal,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeMeal,
  updateShippingAddress,
  updateSpecification,
  updateName,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
