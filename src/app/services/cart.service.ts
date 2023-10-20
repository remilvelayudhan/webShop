import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../Model/cart';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   cart =new BehaviorSubject<Cart>({items:[]});

   constructor(private _snackBar: MatSnackBar) {}

  addToCart(item:CartItem):void{
   let  cartItem = [...this.cart.value.items]
   let existingItem = cartItem.find(_item => _item.id === item.id);
   if(existingItem){
     existingItem.quantity++;
   }else{
     cartItem.push(item);
   }
   this.cart.next({items:cartItem});

    setTimeout(()=>{
      
      this.cart.subscribe(data=>console.log(data));
    },5000);
  }


  clearCart():void{
    this.cart.next({items:[]});
  }


  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }

  getTotal(items: CartItem[]): number {
   return items.map(_item=>_item.quantity*_item.price).reduce((prev,sum)=> prev+sum,0);
  }

}
