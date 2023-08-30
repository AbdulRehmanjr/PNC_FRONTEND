import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'seller-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class SellerHeaderComponent {
  user: any;
  isLogged: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchFromStorage();
  }

  fetchFromStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user != null || this.user != undefined) this.isLogged = true;
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setInterval(() => {
      location.reload();
    }, 1000);
    this.router.navigate(['/home/']);
  }
}
