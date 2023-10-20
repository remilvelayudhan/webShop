import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart, CartItem } from './Model/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cart: Cart = { items: [] };
  itemsQuantity = 0;

  constructor(private cartService: CartService) {}


  ngOnInit(): void {
      this.cartService.cart.subscribe(_cart=>{
        this.cart=_cart
        this.itemsQuantity = this.cart.items
        .map((item) => item.quantity)
        .reduce((prev, curent) => prev + curent, 0);
      
      });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }
onClearCart() {
  this.cartService.clearCart();
  
}
  title = 'frontend';
}
