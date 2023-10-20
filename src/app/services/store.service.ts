import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private http = inject(HttpClient);
  url = environment.STORE_URL


  getAllProduct = (limit: string = '12', sort = 'desc', category?: string): Observable<Product[]> => {
    return this.http.get<Product[]>(`${this.url}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`);
  }

  getAllCategories=():Observable<string[]>=>{
    return  this.http.get<string[]>(`${this.url}/products/categories`);
  }

}  
