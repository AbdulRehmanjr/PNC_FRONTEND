import { Component } from '@angular/core';
import { SellerrequestService } from 'src/app/service/sellerrequest.service';

@Component({
  selector: 'admin-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {

  requestsPending:number
  constructor(private requestService:SellerrequestService){}

  ngOnInit(){
    this.fetchCounts()
  }

  fetchCounts(){
    this.requestService.getRequestsCounting().subscribe({
      next: (response: number) => this.requestsPending = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }
}
