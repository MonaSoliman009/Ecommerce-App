import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ProductsService } from '../../../services/products.service';
import { IProduct } from '../../../models/iproduct';
import { GlobalService, MessageType } from '../../../services/global.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatButtonModule,TranslateModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements AfterViewInit, OnInit,OnDestroy {
  products: IProduct[] = [] as IProduct[];

  readonly dialog = inject(MatDialog);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'category',
    'image',
    'update',
    'delete'
  ];
  dataSource = new MatTableDataSource<IProduct>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _productsService: ProductsService,
    private _globalService:GlobalService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getAllProducts() {
    this._productsService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.products = res;
        this.dataSource.data=this.products;
        console.log(this.products);
      },
      error: (err) => {
        this._globalService._messageAlert(MessageType.Error,'There was a problem , Try Later')

      },
    });
  }

  deleteProduct(id:number){
    this._productsService.deleteProduct(id).pipe(takeUntil(this.destroy$)).subscribe({
      next:(res)=>{

       this._globalService._messageAlert(MessageType.Success,'Product deleted successfully')
      },
      error:(err)=>{
        this._globalService._messageAlert(MessageType.Error,'Product deletion failed')

      }
    })
  }

  deleteProductConfirm(id:number){
  this._globalService.messageConfirm('Are you sure you want to delete this product',()=>{this.deleteProduct(id)})

  }
  openDialog(name:string,id:number|null): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '800px',
      data: {name: name,id:id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
