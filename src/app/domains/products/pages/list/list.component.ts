import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';

import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { Category } from '@shared/models/category.model';
import { CategoriesService } from '@shared/services/categories.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoriesService = inject(CategoriesService)
  @Input() category_id?: string;

  ngOnInit(){
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){
    this.getProducts();
  }

  addToCart(product:Product){
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products)=>{
        this.products.set(products);
      }

    })
  }

  private getCategories(){
    this.categoriesService.getAll()
    .subscribe({
      next: (categories)=>{
        this.categories.set(categories);
      }
    })
  }
}
