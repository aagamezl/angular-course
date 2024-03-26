import { Component, inject } from '@angular/core';

import { ProductListComponent } from '../product-list/product-list.component';
import { Product } from '../product';
import { ProductStore } from '../product.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productList: Product[] = [];
  productService: ProductStore = inject(ProductStore);

  constructor(private store: ProductStore) {
  }

  async ngOnInit() {
    try {
      // this.productList = await this.productService.getAllProducts();
      this.store.getAllProducts();
    } catch (error: any) {
      alert('Connection error: ' + error.code);
    }
  }
}
