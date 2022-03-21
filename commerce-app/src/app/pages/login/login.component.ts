import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoggedIn!: boolean;
  loginForm!: FormGroup;
  private users!: User[];
  currentUser!: any;

  constructor(private userService: UserService, private fb: FormBuilder, private alert: AlertService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      this.currentUser = this.users.find((user: User) => {
        return this.loginForm.value?.email === user.email && this.loginForm.value?.password === user.password
      })

      if (this.currentUser) {
        this.loginForm.reset();
        this.isLoggedIn = true;
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        this.alert.small("success", "Signed in successfully")
        this.userService.checkUser.next(true);
        this.router.navigate(["/products"]);
      } else {
        this.alert.error("Someting went wrong!", "Please check your email and password!")
      }
    }
  }
  isEmailValid() {
    if (this.loginForm.get('email')?.touched) {
      return this.loginForm.controls?.['email'].status === "VALID"
    }
    return null
  }
  isPasswordValid() {
    if (this.loginForm.get('password')?.touched) {
      return this.loginForm.controls?.['password'].status === "VALID"
    }
    return null;
  }

  ngOnDestroy(): void {
  }

}
