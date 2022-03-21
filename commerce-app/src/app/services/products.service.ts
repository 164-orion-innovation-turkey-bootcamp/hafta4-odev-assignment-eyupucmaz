import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable()
export class ProductsService {
  private URL_PATH: string = "https://commerce-server-app.herokuapp.com/products"


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL_PATH);
  }

}