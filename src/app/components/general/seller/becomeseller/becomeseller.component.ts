import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { last } from 'rxjs';
import { Category } from 'src/app/class/category';
import { Seller } from 'src/app/class/seller';
import { Sellerrequest } from 'src/app/class/sellerrequest';
import { CategoryService } from 'src/app/service/category.service';
import { SellerService } from 'src/app/service/seller/seller.service';
import { SellerrequestService } from 'src/app/service/seller/sellerrequest.service';

@Component({
  selector: 'general-becomeseller',
  templateUrl: './becomeseller.component.html',
  styleUrls: ['./becomeseller.component.css'],
})
export class BecomesellerComponent implements OnInit {
  businessForm: FormGroup;
  activeIndex: number = 0;
  selectedOption: string;
  showOptions: boolean = false;
  reSendDialog: boolean = false;
  isRequested: boolean;
  status: any;
  categories: Category[];
  picture: File;
  document: File;
  userId: string;
  request: Sellerrequest;
  remarks: Remarks;
  isActive:boolean = false

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private srService: SellerrequestService,
    private sellerService:SellerService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user'))['userId'];
    this.fetchRequestByUserId();
    this.fetchCategories()
    this.createForm();
  }

  /**
   * The function creates a form using the FormBuilder module in Angular, with various form controls
   * and validators.
   */
  createForm() {
    this.businessForm = this.fb.group({
      businessName: new FormControl('', [Validators.required]),
      category: new FormControl(0, [Validators.required]),
      address: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: ['', [Validators.required, Validators.pattern(/^92\d{10}$/)]],
      email: new FormControl('', [Validators.required, Validators.email]),
      picture: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
    });
  }

  /**
   * The fetchCategories function retrieves all categories from the category service and assigns the
   * response to the categories variable.
   */
  fetchCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: Category[]) => (this.categories = response),
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }

  /**
   * @deprecated deprected since 7/29/23
   * The function "checkRequest" checks if a request has been made by the user and if not, it fetches
   * categories.
   */
  checkRequest() {
    this.srService.getRequestCheck(this.userId).subscribe({
      next: (response: any) => {
        this.isRequested = response;
      },
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }

  /**
   * The function fetchRequestByUserId fetches a request by user ID and updates the status based on the
   * response.
   */
  fetchRequestByUserId() {
    this.srService.getRequestByUserId(this.userId).subscribe({
      next: (response: Sellerrequest) => {
        this.request = response;
        this.isRequested = true;
        if (response.accepted) {
          this.status = true;
        } else if (response.rejected) {
          this.status = false;
        } else {
          this.status = 'pending';
        }
      },
      error: (err: any) => console.log(err),
      complete: () => {
        if(this.status==true)
          this.sellerService.getSellerByEmail(JSON.parse(localStorage.getItem('user'))['userEmail']).subscribe({
            next: (response: Seller) => this.isActive = response.isActive,
            error: (err: any) => console.log(err),
            complete: () => {}
          })
        if (this.request?.remarks) this.parseRemarks(this.request?.remarks);
      },
    });
  }

  /**
   * The function changes the active tab index by adding the given index value.
   * @param {number} index - The index parameter is a number that represents the amount by which the
   * activeIndex should be changed.
   */
  changeTab(index: number) {
    this.activeIndex = this.activeIndex + index;
  }

  /**
   * The function "pictureSelected" assigns the selected file from an event to the "picture" variable.
   * @param {Event} event - The event parameter is an object that represents the event that triggered
   * the pictureSelected function. It contains information about the event, such as the target element
   * that triggered the event and any additional data associated with the event. In this case, the
   * event is likely a file input change event, indicating that a file
   */
  pictureSelected(event: Event) {
    this.picture = event.target['files'][0];
  }

  /**
   * The function assigns the selected file from an event to the "document" variable.
   * @param {Event} event - The event parameter is an object that represents the event that occurred.
   * In this case, it is an event object that is triggered when a document is selected by the user.
   */
  documentSelected(event: Event) {
    this.document = event.target['files'][0];
  }

  /**
   * The onSubmit function creates a new Sellerrequest object with data from a form, sends it to the
   * server along with a picture and document, and then refreshes the page.
   * @returns Nothing is being returned in this code snippet. The `onSubmit()` function is used to
   * handle form submission and make an HTTP request to create a seller request. The function does not
   * have a return statement.
   */
  onSubmit() {
    if (this.businessForm.invalid) return;

    let request = new Sellerrequest();
    request.firstName = this.businessForm.get('firstName').value;
    request.lastName = this.businessForm.get('lastName').value;
    request.businessName = this.businessForm.get('businessName').value;
    request.category = this.businessForm.get('category').value;
    request.email = this.businessForm.get('email').value;
    request.phone = this.businessForm.get('phone').value;
    request.address = this.businessForm.get('address').value;
    request.userId = this.userId;

    this.srService
      .createRequest(request, this.picture, this.document)
      .subscribe({
        next: (response: Sellerrequest) => {},
        error: (err: any) => console.log(err),
        complete: () => {
          this.ngOnInit();
        },
      });
  }

  /**
   * The function "reSend" sets the "reSendDialog" variable to true.
   */
  reSend() {
    this.reSendDialog = true;
    this.businessForm.patchValue(this.request);
  }

  /**
   * The function `submitResend()` sends a request to create a new resend request with the provided
   * request, picture, and document, and then calls `ngOnInit()` to refresh the component.
   */
  submitResend() {
    this.request.accepted = false;
    this.request.rejected = false;
    this.request.remarks = '';
    this.srService
      .createRequest(this.request, this.picture, this.document)
      .subscribe({
        next: (_response: any) => {
          this.ngOnInit();
        },
        error: (err: any) => console.log(err),
        complete: () => {},
      });
  }

  /**
   * The function `parseRemarks` takes a string parameter `remark` and extracts specific information
   * from it to populate properties of an object called `remarks`.
   * @param {string} remark - The `remark` parameter is a string that contains information about a
   * person or a business.
   */
  parseRemarks(remark: string) {
    const idMatch = remark.match(/Id\s*:\s*(\d+)/);
    const firstNameMatch = remark.match(/First Name\s*:\s*(\w+)/);
    const lastNameMatch = remark.match(/Last Name\s*:\s*(\w+)/);
    const businessCategoryMatch = remark.match(/Business Category\s*:\s*(\w+)/);
    const businessNameMatch = remark.match(/Business Name\s*:\s*([\w\s&]+)(?=\s*has been approved)/);

    let values = new Remarks()

    values.id = idMatch ? idMatch[1] : '';
    values.firstName = firstNameMatch ? firstNameMatch[1] : '';
    values.lastName = lastNameMatch ? lastNameMatch[1] : '';
    values.businessCategory = businessCategoryMatch
      ? businessCategoryMatch[1]
      : '';
    values.businessName = businessNameMatch ? businessNameMatch[1] : '';

    this.remarks = values
  }
}

class Remarks {
  id: string
  firstName: string
  lastName: string
  businessCategory: string
  businessName: string
}
