import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../variables/environment';
import { Category } from '../class/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url:string = `${environment.baseUrl}/${environment.category}`
  constructor(private http:HttpClient) { }

  getAllCategories(){
    return this.http.get(`${this.url}/all`,{
      observe:'body'
    })
  }

  createCategory(category:Category,picture:File){
    let formData = new FormData()
    formData.append('category',JSON.stringify(category))
    formData.append('file',picture)

    return this.http.post(`${this.url}/create`,formData,{
      observe:'body'
    })
  }
}
