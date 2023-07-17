import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sellerrequests',
  templateUrl: './sellerrequests.component.html',
  styleUrls: ['./sellerrequests.component.css'],
})
export class SellerrequestsComponent implements OnInit{

  rejectionForm:FormGroup
  isAccepted:boolean
  requestDialog: boolean = false
  actionDialog:boolean = false
  selectedSeller: ISeller
  sellers: ISeller[] = [
    {
      picture: 'https://picsum.photos/200/300?random=1',
      name: 'Seller 1',
      status: true,
      requestedDate: '2023-07-01',
    },
    {
      picture: 'https://picsum.photos/200/300?random=2',
      name: 'Seller 2',
      status: false,
      requestedDate: '2023-06-30',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
    {
      picture: 'https://picsum.photos/200/300?random=10',
      name: 'Seller 10',
      status: true,
      requestedDate: '2023-07-05',
    },
  ];

  constructor(private fb:FormBuilder){}

  ngOnInit(){
    this.createForm()
  }

  createForm(){
    this.rejectionForm = this.fb.group({
      rejection : new FormControl('',[Validators.required])
    })
  }

  getValue(value: boolean) {
    switch (value) {
      case true:
        return 'Accepted';
      case false:
        return 'Pending';
    }
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'danger';
    }
  }

  showRequestDialog(seller:ISeller){
    this.selectedSeller = seller
    this.requestDialog = true
  }

  hideRequestDialog(){
    this.requestDialog = false
  }

  showActionDialog(status:boolean){
    this.actionDialog = true
  }

  requestAction(){

  }
}

interface ISeller {
  picture: string;
  name: string;
  status: boolean;
  requestedDate: string;
}
