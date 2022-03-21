import { CartItem } from "./cartItem.model";

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  cart: CartItem[];
}