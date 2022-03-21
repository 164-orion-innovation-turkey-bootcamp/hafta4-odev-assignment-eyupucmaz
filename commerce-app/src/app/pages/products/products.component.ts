import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService, CategoryService]
})
export class ProductsComponent implements OnInit {
  list!: Product[];
  filteredList!: Product[];
  categories!: Category[];
  activeCategory: number = 0;
  productNotfount: boolean=false;

  constructor(private productsService: ProductsService, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.list = data;
      this.filteredList = this.list
    })
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data
    })
    this.route.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.productsService.getProducts().subscribe(products => {
          this.filteredList = products.filter((product) => product.name.toLowerCase().includes(params['searchTerm'].toLowerCase()))
          if (this.filteredList.length) {
            this.productNotfount = true;
          }
        })

      }
    })
  }

  filterBy(categoryId: number) {
    this.filteredList = this.list.filter((product) => {
      return product.categoryId === categoryId
    })
    this.activeCategory = categoryId;
  }
  showAll() {
    this.filteredList = this.list
    this.activeCategory = 0;
  }

}
