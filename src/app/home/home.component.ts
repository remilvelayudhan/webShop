import { Component, OnInit, inject } from '@angular/core';
import { sortBy } from '../helper/helper.enum';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';
import { StoreService } from '../services/store.service';
import { CartService } from '../services/cart.service';

const ROWS_HEIGHT:{[id:number]:number}={ 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


showFiller: any=true;
category:string='';
cols:number=3;
count:string="12";
sort:sortBy=sortBy.asc;
products$:Observable<Product[]>|undefined;
rowHeight:number=ROWS_HEIGHT[this.cols];

private productServices=inject(StoreService);
private cartServices=inject(CartService);



ngOnInit(): void {
  this.products$ = this.productServices.getAllProduct(this.count,this.sort,this.category);
}



onShowCategorey(newCategory:any):void{
this.category=newCategory
this.products$ = this.productServices.getAllProduct(this.count,this.sort,this.category);
}


onItemsCountUpdated($event: number) {
  this.count=$event.toString();
  this.products$ = this.productServices.getAllProduct(this.count,this.sort,this.category);
  }
  onColumnsUpdated($event: number) {
    this.cols = $event;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }


  onSortBy($event: sortBy) {
   this.sort = $event;
   this.products$ = this.productServices.getAllProduct(this.count,this.sort,this.category);
    }

  

      

      onAddToCart(product: Product): void {
        this.cartServices.addToCart({
          product: product.image,
          name: product.title,
          price: product.price,
          quantity: 1,
          id: product.id,
        });

        
      }
      
    
}
