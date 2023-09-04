import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { User } from 'src/app/class/user/user';
import { CartService } from 'src/app/service/inventory/cart.service';
@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  isLogged: boolean = false;
  role: string = '';
  cartCount:number = 0

  constructor(private router: Router,private cartService:CartService) {}

  ngOnInit(): void {
    this.fetchFromStorage();
    this.cartService.getCountOfCart$().subscribe({
      next: (response: any) => this.cartCount = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }

  fetchFromStorage() {
    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user != null || this.user != undefined) this.isLogged = true;

    this.role = this.user['role']['roleName'];
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
