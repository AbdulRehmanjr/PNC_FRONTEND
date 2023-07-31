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
  detailDialog: boolean = false;
  actionDialog: boolean = false;
  selectedSeller: Sellerrequest;
  requests: Sellerrequest[];

  constructor(
    private fb: FormBuilder,
    private srService: SellerrequestService
  ) {}

  ngOnInit() {
    this.fetchRequests();
    this.createForm();
  }

  createForm() {
    this.rejectionForm = this.fb.group({
      rejection: new FormControl('', [Validators.required]),
    });
  }

  getValue(accept: boolean, reject: boolean) {

    if (accept === true && reject === false) {
      return 'Accepted';
    } else if (accept === false && reject == true) {
      return 'Rejected';
    } else if (accept === false && reject === false) {
      return 'Pending';
    }
    return ""
  }

  getSeverity(accept: boolean, reject: boolean) {
    if (accept === true && reject === false) {
      return 'success';
    } else if (accept === false && reject == true) {
      return 'danger';
    } else if (accept === false && reject === false) {
      return 'warning';
    }
    return ""
  }

  fetchRequests() {
    this.srService.getAllRequests().subscribe({
      next: (response: Sellerrequest[]) => {
        this.requests = response;
      },
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }

  showRequestDialog(seller: Sellerrequest) {
    this.selectedSeller = seller;
    this.detailDialog = true;
  }

  hideRequestDialog() {
    this.detailDialog = false;
  }

  showActionDialog() {
    this.actionDialog = true;
  }

  /**
   * The acceptRequest function accepts a request and updates the detailDialog property to false when
   * the request is completed.
   */
  acceptRequest() {
    this.srService.acceptRequest(this.selectedSeller.requestId).subscribe({
      next: (_response: any) => {},
      error: (err: any) => console.log(err),
      complete: () => {
        this.detailDialog = false
      }
    })
  }

  /**
   * The `rejectRequest` function sends a rejection message to the server and updates the UI
   * accordingly.
   */
  rejectRequest() {
    const message = this.rejectionForm.get('rejection').value;

    this.srService
      .rejectRequest(message, this.selectedSeller.requestId)
      .subscribe({
        next: (_response: any) => {},
        error: (err: any) => console.log(err),
        complete: () => {
          this.detailDialog = false;
          this.actionDialog = false;
          this.fetchRequests()
        },
      });
  }
}
