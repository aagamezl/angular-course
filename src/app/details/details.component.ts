import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product';

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
  productService = inject(ProductService);
  product: Product | undefined;
  productId = ''
  currentSlide = 0;

  constructor() {
    // this.productId = this.route.snapshot.params['id'];
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.product = await this.productService.getProductById(this.productId);

    // Initialize slideshow
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slides every 5 seconds
  }

  nextSlide() {
    if (this.product && this.product.images) {
      this.currentSlide = (this.currentSlide + 1) % this.product.images.length;
    }
  }

  prevSlide() {
    if (this.product && this.product.images) {
      this.currentSlide = (this.currentSlide - 1 + this.product.images.length) % this.product.images.length;
    }
  }
}
