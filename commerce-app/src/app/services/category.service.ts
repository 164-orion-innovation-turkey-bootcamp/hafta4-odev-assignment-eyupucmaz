import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";

@Injectable()
export class CategoryService {

  categories!: Category[];
  URL_PATH: string = "http://localhost:3000/categories"
  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL_PATH);
  }

}