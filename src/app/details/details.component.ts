import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductStore } from '../product.store';
import { Product } from '../product';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productStore = inject(ProductStore);
  // product: Product | undefined;
  product$: Observable<Product | undefined> = new Observable<Product>();
  productId = ''
  currentSlide = 0;

  async ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.productId = params['id'];

    //   this.productStore.getProductById(this.productId)
    // });

    // this.product = await this.productStore.getProductById(this.productId);

    this.product$ = this.route.params.pipe(
      switchMap(params => {
        return this.productStore.getProductById(params['id'])
      })
    );

    // Initialize slideshow
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slides every 5 seconds
  }

  nextSlide() {
    // if (this.product && this.product.images) {
    //   this.currentSlide = (this.currentSlide + 1) % this.product.images.length;
    // }
  }

  prevSlide() {
    // if (this.product && this.product.images) {
    //   this.currentSlide = (this.currentSlide - 1 + this.product.images.length) % this.product.images.length;
    // }
  }
}
