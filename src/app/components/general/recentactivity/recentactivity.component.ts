import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
  selector: 'general-recentactivity',
  templateUrl: './recentactivity.component.html',
  styleUrls: ['./recentactivity.component.css']
})
export class RecentactivityComponent implements OnInit{

  array:number[] = [1,2,3,4,5,6,7,8,9,10]
  user:any
  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('user'))
  }

}
