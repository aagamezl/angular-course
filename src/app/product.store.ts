import { Injectable } from '@angular/core';

import { Product } from './product';
import { environment } from '../environments/environment';
import Store from './store/Store';
import ApiService from './store/ApiService';

@Injectable({
  providedIn: 'root'
})
export class ProductStore extends Store<Product[]> {
  protected readonly endpoint = environment.backendUrl + '/products';
  protected productList: Product[] = [];

  constructor(private apiService: ApiService<Product>) {
    super([]);
  }

  async getAllProducts() {
    this.apiService.getAll(this.endpoint).subscribe((products) => {
      this.setState(products);
    });
  }

  async getProductById(id: string) {
    const response = await fetch(environment.backendUrl + `/products/${id}`)

    return await response.json();
  }

  createProduct(form: Product) {
    return this.apiService.create(this.endpoint, form)
  }
}
