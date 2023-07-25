import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Sellerrequest } from 'src/app/class/sellerrequest';
import { SellerrequestService } from 'src/app/service/sellerrequest.service';

@Component({
  selector: 'app-sellerrequests',
  templateUrl: './sellerrequests.component.html',
  styleUrls: ['./sellerrequests.component.css'],
})
export class SellerrequestsComponent implements OnInit {

  rejectionForm: FormGroup;
  isAccepted: boolean;
  requestDialog: boolean = false;
  actionDialog: boolean = false;
  selectedSeller: Sellerrequest;
  requests:Sellerrequest[]

  constructor(
    private fb: FormBuilder,
    private srService: SellerrequestService
  ) {}

  ngOnInit() {
    this.fetchRequests()
    this.createForm();
  }

  createForm() {
    this.rejectionForm = this.fb.group({
      rejection: new FormControl('', [Validators.required]),
    });
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

  fetchRequests(){
    this.srService.getAllRequests().subscribe({
      next: (response: Sellerrequest[]) => {
        console.log(response)
        this.requests = response
      },
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }

  downloadFile(file:string){

  }
  showRequestDialog(seller: Sellerrequest) {
    this.selectedSeller = seller;
    this.requestDialog = true;
  }

  hideRequestDialog() {
    this.requestDialog = false;
  }

  showActionDialog() {
    this.actionDialog = true
  }

  requestAction() {

  }

  rejectRequest(){
    const message = this.rejectionForm.get('rejection').value

    this.srService.rejectRequest(message,this.selectedSeller.requestId).subscribe({
      next: (response: any) => {},
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }
}
