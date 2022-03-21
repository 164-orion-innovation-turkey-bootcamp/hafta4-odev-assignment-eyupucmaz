import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private alert: AlertService, private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      lastname: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }
  isEmailValid() {
    if (this.signupForm.get('email')?.touched) {
      return this.signupForm.controls?.['email'].status === "VALID"
    }
    return null
  }
  isPasswordValid() {
    if (this.signupForm.get('password')?.touched) {
      return this.signupForm.controls?.['password'].status === "VALID"
    }
    return null;
  }
  isNameValid() {
    if (this.signupForm.get('name')?.touched) {
      return this.signupForm.controls?.['name'].status === "VALID"
    }
    return null;
  }
  isLastnameValid() {
    if (this.signupForm.get('lastname')?.touched) {
      return this.signupForm.controls?.['lastname'].status === "VALID"
    }
    return null;
  }

  signup() {
    if (this.signupForm.valid) {
      let user: User = {
        id: Date.now(),
        name: this.signupForm.controls?.['name'].value,
        lastname: this.signupForm.controls?.['lastname'].value,
        email: this.signupForm.controls?.['email'].value,
        password: this.signupForm.controls?.['password'].value,
        cart: []
      }
      this.userService.saveUser(user).subscribe(
        () => { },
        (err) => { this.alert.error("Server Error", "Something went wrong!") },
        () => {
          this.signupForm.reset();
          this.alert.small("success", `Welcome ${user.name}`);
          this.router.navigate(['/login']);

        });
    }
  }


}
