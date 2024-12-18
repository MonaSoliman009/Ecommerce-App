import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
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
import { GlobalService, MessageType } from '../../../services/global.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    TranslateModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit ,OnDestroy{
  categories!: string[];
  selectedFile: File | null = null;
  lang: string = '';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  readonly data = inject<{name:string,id:number}>(MAT_DIALOG_DATA);

  product: IProduct = {} as IProduct;
  readonly dialogRef = inject(MatDialogRef<AddProductComponent>);
  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService,
    private _globalService:GlobalService,
    private _languageService:LanguageService
  ) {}
  ngOnInit(): void {

    if(this.data.id){
      this.getProductById(this.data.id)
    }

    this.getAllCategories();
    this.getLanguage()
  }
  getLanguage() {
    this._languageService.getLanguage().pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this.lang = language;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllCategories() {
    this._categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        console.log(res);

        this.categories = res;
      },
      error: (err) => {
        this._globalService._messageAlert(MessageType.Error,err.message)
      },
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
    console.log("sssss");

    if (this.selectedFile) {


      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('upload_preset', 'Images');
      formData.append('api_key', 'S7jdt06F3hO-3vCjHyyhjwj9EQI');


      this._productsService.uploadProductImage(formData).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.product.image=res.secure_url
          if(this.data.name=='Add'){
            this.addNewProduct()

          }else if(this.data.name=='Update'){
           this.updateProduct
          }
        },
        error:(err) =>{
          this._globalService._messageAlert(MessageType.Error,err.message)
        },
      });
    } else {
      if(this.data.name=='Update'){
        this.updateProduct()
      }else{
        this._globalService._messageAlert(MessageType.Error,'No File Selected')

      }
    }
  }

  addNewProduct(){

    this._productsService.addNewProduct(this.product).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{
        console.log(res);
        this._globalService._messageAlert(MessageType.Success,'Product Added Successfully')

      },error:(err)=>{
        this._globalService._messageAlert(MessageType.Error,'Add Failed ..')

      }
    })
  }
updateProduct(){

  this._productsService.updateProduct(this.data.id,this.product).pipe(takeUntil(this.destroy$)).subscribe({
    next:(res)=>{
      console.log(res);
      this._globalService._messageAlert(MessageType.Success,'Product Updates Successfully')

    },error:(err)=>{
      this._globalService._messageAlert(MessageType.Error,'Update Failed ..')

    }
  })
}
  getProductById(id:number){
    this._productsService.getProductById(id).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{
        console.log(res);
        this.product=res
      },error:(err)=>{
        this._globalService._messageAlert(MessageType.Error,'Failed to Get Product')
      }
    })

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
