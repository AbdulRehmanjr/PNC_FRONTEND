import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/class/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-becomeseller',
  templateUrl: './becomeseller.component.html',
  styleUrls: ['./becomeseller.component.css']
})
export class BecomesellerComponent implements OnInit {

  businessForm: FormGroup
  activeIndex:number = 0
  cities:any
  selectedOption: string
  showOptions:boolean = false
  isRequested:boolean = false
  categories:Category[]

  constructor(private fb: FormBuilder,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.fetchCategories()
    this.createForm()
  }

  createForm() {
    this.businessForm = this.fb.group({
      businessName: new FormControl('', [Validators.required]),
      category: new FormControl(0,[Validators.required]),
      address: new FormControl('',[Validators.required]),
      firstName : new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email])
    })
  }

  fetchCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (response: Category[]) => this.categories = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }

  changeTab(index:number){
    this.activeIndex = this.activeIndex + index
  }

}
