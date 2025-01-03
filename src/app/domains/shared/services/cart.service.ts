import { computed, Injectable, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([]);
  total = computed(()=>{
    let total = 0;

    for (let i = 0; i < this.cart().length; i++){
      total+= this.cart()[i].price;
    }

    return total;

  })

  constructor() { }

  addToCart(product:Product){
    this.cart.update(prevState=>[...prevState, product]);
  }
}
