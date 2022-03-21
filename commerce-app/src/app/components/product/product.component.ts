import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem.model';
import { Product } from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductsService, CartService]
})
export class ProductComponent implements OnInit, AfterViewChecked, DoCheck {

  activeProductId!: number;
  productsList!: Product[];
  activeProduct!: Product[];
  constructor(private route: ActivatedRoute, private productService: ProductsService, private cartSercive: CartService, private alert: AlertService) {
    this.route.params.subscribe((params) => {
      this.activeProductId = params['productId'] as number;
    })
    this.productService.getProducts().subscribe((list) => {
      this.productsList = list;
    })

  }

  ngOnInit(): void {

  }
  ngDoCheck(): void {
    this.activeProduct = this.productsList.filter((product) => {
      return product.id == this.activeProductId as number
    })
  }
  ngAfterViewChecked(): void {

  }
  addToCart() {
    this.cartSercive.addCart({ productId: this.activeProductId } as CartItem)
    this.alert.small("info", `${this.activeProduct[0].name} Added your cart!`)
  }

}
