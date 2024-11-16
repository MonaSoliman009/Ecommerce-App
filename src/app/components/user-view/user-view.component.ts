import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { MatListModule } from '@angular/material/list';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';
import { GlobalService, MessageType } from '../../../services/global.service';
import { IProduct } from '../../../models/iproduct';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [MatListModule, MatIconModule,MatCardModule,MatGridListModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss',
})
export class UserViewComponent implements OnInit {
  categories!: string[];
  selectedCategory!: string;
  products:IProduct[]=[] as IProduct[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService,
    private _globalService: GlobalService
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        console.log(res);

        this.categories = res;
        this.selectedCategory = this.categories[0];
        this.getCategoryProducts(this.selectedCategory );

      },
      error: (err) => {
        this._globalService._messageAlert(MessageType.Error, err.message);
      },
    });
  }
  getCategoryProducts(catName: string) {
    this.selectedCategory = catName;
    this._productsService
      .getProductsByCategoryName(this.selectedCategory).pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.products=res
        },
        error: (err) => {
          this._globalService._messageAlert(MessageType.Error, err.message);
        },
      });

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
