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

  // async getProductById(id: string): Promise<Product | undefined> {
  async getProductById(id: string) {
    // const response = await fetch(environment.backendUrl + `/products/${id}`)

    // return await response.json();
    this.apiService.getById(this.endpoint, id).subscribe((product) => {
      this.getState()
      this.setState(product);
    });
  }

  // async createProduct(form: FormData) {
  createProduct(form: Product) {
    return this.apiService.create(this.endpoint, form)
    // await fetch(environment.backendUrl + '/products', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(form)
    // });
  }
}
