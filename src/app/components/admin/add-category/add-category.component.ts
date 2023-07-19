import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/class/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  categories:Category[]
  showDialog:boolean = false
  categoryForm:FormGroup
  file:File

  constructor(private fb:FormBuilder,private categoryService:CategoryService){}

  ngOnInit(){
    this.createForm()
  }

  createForm(){
    this.fetchCategories()
      this.categoryForm = this.fb.group({
        name : new FormControl('',[Validators.required]),
        picture : new FormControl('',[Validators.required])
      })

  }

  selectFile(event:Event){
    this.file = event.target['files'][0]
  }

  displayDialog(){
    this.showDialog = true
  }

  fetchCategories(){
    this.categoryService.getAllCategories().subscribe({
      next: (response: Category[]) => this.categories = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }

  onSubmit(){

    let category = new Category()
    category.categoryName = this.categoryForm.get('name').value

    this.categoryService.createCategory(category,this.file).subscribe(
      {
        next:(response:any) => {},
        error:(err:any) => console.log(err),
        complete:() => this.showDialog = false
      }
    )
  }
}
