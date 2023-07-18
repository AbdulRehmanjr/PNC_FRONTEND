import { Component } from '@angular/core';
import { BusinessCategory } from 'src/app/class/business-category';

@Component({
  selector: 'general-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories:BusinessCategory[] = [
    {
      categoryId:1,
      categoryName:'Resturant',
      picture:'assets/category/Restaurant.png'
    },
    {
      categoryId:2,
      categoryName:'Home Services',
      picture:'assets/category/HomeServices.png'
    },
    {
      categoryId:3,
      categoryName:'Automobile',
      picture:'assets/category/Automobile.png'
    },
  ]
}
