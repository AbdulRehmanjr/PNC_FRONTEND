import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';
import { Category } from 'src/app/class/category';
import { Sellerrequest } from 'src/app/class/sellerrequest';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-becomeseller',
  templateUrl: './becomeseller.component.html',
  styleUrls: ['./becomeseller.component.css'],
})
export class BecomesellerComponent implements OnInit {
  businessForm: FormGroup;
  activeIndex: number = 0;
  cities: any;
  selectedOption: string;
  showOptions: boolean = false;
  isRequested: boolean = false;
  categories: Category[];
  picture:File
  document:File

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.createForm();
  }

  createForm() {
    this.businessForm = this.fb.group({
      businessName: new FormControl('', [Validators.required]),
      category: new FormControl(0, [Validators.required]),
      address: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: ['', [Validators.required, Validators.pattern(/^92\d{9}$/)]],
      email: new FormControl('', [Validators.required, Validators.email]),
      picture: new FormControl('',[Validators.required]),
      document: new FormControl('',[Validators.required])
    });
  }

  fetchCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: Category[]) => (this.categories = response),
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }

  changeTab(index: number) {
    this.activeIndex = this.activeIndex + index;
  }

  profileFile(event:Event){
    this.picture = event.target['files'][0]
  }

  documentFile(event:Event){
    this.document = event.target['files'][0]
  }

  onSubmit(){

    let request = new Sellerrequest()
    request.firstName = this.businessForm.get('firstName').value
    request.lastName = this.businessForm.get('lastName').value
    request.businessName = this.businessForm.get('businessName').value
    request.category = this.businessForm.get('category').value
    request.email = this.businessForm.get('email').value
    request.phone = this.businessForm.get('phone').value
    request.address = this.businessForm.get('address').value


  }
}
