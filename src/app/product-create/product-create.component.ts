import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  productService = inject(ProductService);
  form = new FormBuilder()

  productForm = this.form.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    thumbnail: [''],
    images: this.form.array([]) // For multiple images
  });

  async onSubmit() {
    if (this.productForm.valid) {
      await this.productService.createProduct(this.convertFormToFormData(this.productForm))
    }
  }

  convertFormToFormData(form: FormGroup): FormData {
    const formData = new FormData();
    const formValue = form.getRawValue();

    Object.keys(formValue).forEach(key => {
      if (key === 'images') {
        const files = formValue[key];
        for (const file of files) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, formValue[key]);
      }
    });

    return formData;
  }
}
