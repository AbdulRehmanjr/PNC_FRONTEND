import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Category } from 'src/app/class/category';
import { Product } from 'src/app/class/product';
import { Seller } from 'src/app/class/seller';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/inventory/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  productForm: FormGroup;
  uploadedFiles: any[] = [];
  productDialog: boolean = false;
  editDialog: boolean = false;
  products: Product[];
  product: Product;
  selectedProducts!: Product[] | null;
  submitted: boolean = false;
  categories: Category[];
  statuses = [
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' },
  ];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categorySerivce: CategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.fetchProductsBySellerId();
    this.createForm();
  }

  getCategories() {
    this.categorySerivce.getAllCategories().subscribe({
      next: (response: Category[]) => (this.categories = response),
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }
  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      inventoryStatus: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }
  get f() {
    return this.productForm.controls;
  }

  arrayMinLengthValidator(minLength = 1): ValidatorFn {
    return (array: FormArray): { [key: string]: any } | null => {
      const length = array.length;
      return length < minLength
        ? { arrayMinLength: { length, requiredLength: minLength } }
        : null;
    };
  }

  onUpload(event: any) {
    for (let file of event['files']) {
      this.uploadedFiles.push(file);
    }
  }

  onRemove(event: any) {
    const index = this.uploadedFiles.findIndex(
      (file) => file.name === event.file.name
    );
    if (index !== -1) {
      this.uploadedFiles = this.uploadedFiles.splice(index, 1);
    }
  }

  onClear() {
    this.uploadedFiles = [];
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  openEdit(product: Product) {
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      inventoryStatus: product.inventoryStatus,
      category: product.category.categoryId,
      price: product.price,
      quantity: product.quantity,
    });
    this.editDialog = true;
  }

  deleteSelectedProducts() {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected products?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
    //         this.selectedProducts = null;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //     }
    // });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
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

  fetchProductsBySellerId() {
    const id = JSON.parse(localStorage.getItem('seller'))['sellerId'];
    this.productService.getProductsBySellerId(id).subscribe({
      next: (response: Product[]) => (this.products = response),
      error: (err: any) => console.log(err),
      complete: () => {},
    });
  }
  onSubmit() {
    if (this.productForm.invalid) return;

    let product = new Product();
    product.name = this.f['name'].value;
    product.description = this.f['description'].value;
    product.price = this.f['price'].value;
    product.quantity = this.f['quantity'].value;
    product.inventoryStatus = this.f['inventoryStatus'].value;

    let category = new Category();
    category.categoryId = this.f['category'].value;
    product.category = category;

    let seller = new Seller();
    seller.sellerId = JSON.parse(localStorage.getItem('seller'))['sellerId'];
    product.seller = seller;

    this.productService.saveProduct(product, this.uploadedFiles).subscribe({
      next: (response: Product) => {},
      error: (err: any) => console.log(err),
      complete: () => {
        this.productDialog = false
        this.fetchProductsBySellerId()
      },
    });
  }

  updateSubmit() {
    if (this.productForm.invalid) return;
  }
}
