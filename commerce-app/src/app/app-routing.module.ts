import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProductsComponent } from './pages/products/products.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" }, // Home Page
  { path: "home", component: HomeComponent }, // Home Page
  { path: "login", component: LoginComponent }, // Login Page
  { path: "signup", component: SignupComponent }, // SignUp Page
  {
    path: "user",
    component: LoginComponent,
    canActivate: [AuthGuard],
  }, // User Page
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [AuthGuard],
  }, // Products Page
  { path: "product/:productId", component: ProductComponent, canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent }, // Products Page
  { path: "cart", component: CartComponent, canActivate: [AuthGuard] }, // Products Page
  { path: "search/:searchTerm", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotfoundComponent } //for random endpoints
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
