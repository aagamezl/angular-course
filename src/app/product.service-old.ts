import { Injectable } from '@angular/core';

import { Product } from './product';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected productList: Product[] = [];

  constructor() { }

  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(environment.backendUrl + '/products');

    return await response.json();
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const response = await fetch(environment.backendUrl + `/products/${id}`)

    return await response.json();
  }

  async createProduct(form: FormData) {
    await fetch(environment.backendUrl + '/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });
  }
}
