export interface IMeal {
  _id: string;
  name: string;
  imageUrls: string[];
  price: number;
  calories: string;
  category: string;
  mealProvider: string;
  user: string;
  isActive: boolean;
  ingredients: string;
  portion_size: string;
  why_eat: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IOrder {
  meals: IOrderMeal[];
  shippingAddress: string;
}

export interface IOrderMeal {
  meal: string;
  quantity: number;
  mealProvider: string;
}
