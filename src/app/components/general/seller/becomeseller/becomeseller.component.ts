import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-becomeseller',
  templateUrl: './becomeseller.component.html',
  styleUrls: ['./becomeseller.component.css']
})
export class BecomesellerComponent implements OnInit {

  businessForm: FormGroup
  activeIndex:number = 1
  cities:any
  selectedOption: string;
  showOptions = false;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
    this.createForm()
  }

  createForm() {
    this.businessForm = this.fb.group({
      businessName: new FormControl('', [Validators.required]),
      category: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      firstName : new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email])
    })
  }
  changeTab(index:number){
    this.activeIndex = this.activeIndex + index
  }
}
