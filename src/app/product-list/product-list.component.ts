import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../product';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductStore } from '../product.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  // @Input() products!: Product[];
  products$: Observable<Product[]> = this.store.state$;

  constructor(private store: ProductStore) {
  }
}
