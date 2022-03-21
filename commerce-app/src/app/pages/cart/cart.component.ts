import { Component, DoCheck, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

// interface CartListItem {
//   name: string;
//   image: string;
//   price: string;
//   id: number;
// }
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService, ProductsService]
})
export class CartComponent implements OnInit, DoCheck {

  productList!: Product[];
  cartList: any;
  cartItems!: CartItem[];
  total: number = 0
  constructor(private cartService: CartService, private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((items: Product[]) => {
      this.productList = items;
    });
    this.cartService.userCart.subscribe(cartItem => {
      this.cartItems = cartItem;
      // cartItem.map(item => this.cartItems.push(item.productId as unknown as string))
    })
  }

  ngDoCheck(): void {
    let allID = this.cartItems.map(({ productId }) => productId)
    let list: Array<any> = [];
    allID.forEach((id) => {
      let product = this.productList.filter(item => item.id == id);
      this.total += product[0].price;
      list.push(product[0]);
    })
    this.cartList = list;
  }
}
