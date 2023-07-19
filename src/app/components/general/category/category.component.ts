import { Component } from '@angular/core';
import { Category } from 'src/app/class/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'general-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  categories:Category[]

  constructor(private categoryService:CategoryService){}

  ngOnInit(){
    this.fetchCategories()
  }

  fetchCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (response: Category[]) => this.categories = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }
}
