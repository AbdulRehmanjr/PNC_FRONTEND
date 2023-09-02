import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { User } from 'src/app/class/user/user';
@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any
  isLogged:boolean = false
  role:string= ''
  constructor(private router:Router){}
  ngOnInit(): void {
    this.fetchFromStorage()
  }

  fetchFromStorage(){

    this.user = JSON.parse(localStorage.getItem('user'))

    if(this.user!=null || this.user!=undefined)
      this.isLogged =true

      this.role = this.user['role']['roleName']
  }

  logOut() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setInterval(
      () => {
        location.reload()
      }, 1000
    )
    this.router.navigate(['/home/'])
  }

}
