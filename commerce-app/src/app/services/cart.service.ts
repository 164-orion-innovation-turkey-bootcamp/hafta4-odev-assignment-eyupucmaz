import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "../models/cartItem.model";
import { User } from "../models/user.model";

@Injectable()
export class CartService {

  private cart: CartItem[] = this.getItemFromLocal();
  userCart = new BehaviorSubject<CartItem[]>(this.cart);

  constructor() {

  }
  private getUserFromLocal(): User {
    return JSON.parse(localStorage.getItem("user") as string) as User;
  }
  private getItemFromLocal(): CartItem[] {
    return this.getUserFromLocal().cart;
  }

  addCart(product: CartItem) {
    this.cart.push(product);
    this.userCart.next(this.cart);
    let user = this.getUserFromLocal();
    user.cart = this.cart;
    localStorage.setItem("user", JSON.stringify(user));
  }
}