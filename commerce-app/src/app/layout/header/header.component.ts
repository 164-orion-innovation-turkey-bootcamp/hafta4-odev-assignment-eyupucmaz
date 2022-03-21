import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm: string = "";
  currentUser!: User;
  isLoggedIn!: boolean;
  searchForm!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: [""]
    })
    this.userService.checkUser.subscribe((res) => {
      this.isLoggedIn = res;
    })
  }
  onSubmit() {
    if (this.searchTerm) {
      this.router.navigate(['search', this.searchTerm]);
      this.searchTerm = '';
    }
  }
  logout() {
    localStorage.clear();
    this.userService.checkUser.next(false);
    this.router.navigate(['/home'])
  }
}
