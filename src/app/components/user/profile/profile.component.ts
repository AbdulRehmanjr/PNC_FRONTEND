import { Component } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  user:any

  ngOnInit(){
    this.user =JSON.parse(localStorage.getItem('user'))
  }

}
