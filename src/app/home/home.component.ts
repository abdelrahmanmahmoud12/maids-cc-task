import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  searchId: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  isSearchValid: boolean = false;
  totalPagesArray: number[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1): void {
    setTimeout(() => {
      this.userService.getUsers(page).subscribe((response: any) => {
        this.users = response.data;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.updateTotalPagesArray();
      });
    }, 700);
  }

  searchUserById(): void {
    if (this.searchId && /^\d+$/.test(this.searchId)) {
      const id = Number(this.searchId);
      this.userService.getUserById(id).subscribe(
        (user: any) => {
          this.users = [user.data];
          this.isSearchValid = true;
        },
        (error) => {
          this.isSearchValid = false;
          this.loadUsers();
        }
      );
    } else {
      this.isSearchValid = false;
      this.loadUsers(); 
    }
  }

  navigateToDetails(userId: number): void {
    this.router.navigate(['/details', userId]);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadUsers(page);
    }
  }

  updateTotalPagesArray(): void {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
