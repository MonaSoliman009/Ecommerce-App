import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { IProduct } from '../../../models/iproduct';
import { CategoriesService } from '../../../services/categories.service';
import { NgIf } from '@angular/common';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  categories!: string[];
  selectedFile: File | null = null;

  product: IProduct = {} as IProduct;
  readonly dialogRef = inject(MatDialogRef<AddProductComponent>);
  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);

        this.categories = res;
      },
      error: (err) => {},
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile);
    }
  }

  // Placeholder function to handle file upload
  uploadFile(): void {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'Images');
      formData.append('api_key', 'S7jdt06F3hO-3vCjHyyhjwj9EQI');


      this._productsService.uploadProductImage(formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      console.log('No file selected.');
    }
  }

  addNewProduct(){
    this.uploadFile()
  }
}
