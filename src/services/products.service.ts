import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}
  getAllProducts(): Observable<IProduct> {
    return this._httpClient.get<IProduct>(`${environment.baseUrl}/products`);
  }
  addNewProduct(product:IProduct): Observable<IProduct> {
    return this._httpClient.post<IProduct>(`${environment.baseUrl}/products`,
      JSON.stringify(product) );

  }

  updateProduct(id:number,product:IProduct): Observable<IProduct> {
    return this._httpClient.patch<IProduct>(`${environment.baseUrl}/products/${id}`,
      JSON.stringify(product) );
  }

  deleteProduct(id:number): Observable<IProduct> {
    return this._httpClient.delete<IProduct>(`${environment.baseUrl}/products/${id}`);
  }
}
