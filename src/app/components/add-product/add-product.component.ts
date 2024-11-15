import { Component, inject } from '@angular/core';
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
import { IProduct } from '../../../models/iproduct';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatButtonModule
    ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  product:IProduct={} as IProduct;
  readonly dialogRef = inject(MatDialogRef<AddProductComponent>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
