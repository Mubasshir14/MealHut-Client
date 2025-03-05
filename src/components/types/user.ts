export interface IUser {
    userId: string;
    name: string;
    email: string;
    mealProvider?: boolean;
    isActive?: boolean;
    role: "customer" | "mealProvider";
    phone?: string;
    address?: string;
    iat?: number;
    exp?: number;
  }
  
