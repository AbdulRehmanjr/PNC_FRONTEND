import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/class/inventory/product';
import { CartService } from 'src/app/service/inventory/cart.service';
import { ProductService } from 'src/app/service/inventory/product.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent {

  heading:string
  products:Product[]

  constructor(private route:ActivatedRoute,private productService:ProductService,private cartService:CartService){}

  ngOnInit(){
    this.heading = this.route.snapshot.paramMap.get('categoryName');
    this.fetchProductsByCategoryName()
  }

  fetchProductsByCategoryName(){
    this.productService.getProductsByCategoryName(this.heading).subscribe({
      next: (response: Product[]) =>this.products = response,
      error: (err: any) => console.log(err),
      complete: () => {}
    })
  }

  getSeverity(status: string) {
    switch (status) {
      case 'instock':
        return 'success';
      case 'lowstock':
        return 'warning';
      case 'outofstock':
        return 'danger';
      default:
        return '';
    }
  }

  addToCart(product:Product){

    this.cartService.addToCart(product)
  }
}
