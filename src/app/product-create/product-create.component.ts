import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ProductStore } from '../product.store';
import { Product } from '../product';

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
  productStore = inject(ProductStore);
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
    images: [] // For multiple images
  });

  async onSubmit() {
    if (this.productForm.valid) {
      try {
        // desabilitar botón
        this.productStore
          .createProduct(this.convertFormToFormData(this.productForm))
          .subscribe();
      } catch (error: any) {
        alert('El servidor no está disponible. Intente más tarde. ' + error.message)
      } finally {
        // habilitar botón
      }
    }
  }

  convertFormToFormData(form: FormGroup) {
    // const formData = new FormData();
    const formValue = form.getRawValue();
    return formValue as Product // Cast object to Product

    // Object.keys(formValue).forEach(key => {
    //   // if (key === 'images') {
    //   //   const files = formValue[key];
    //   //   for (const file of files) {
    //   //     formData.append(key, file);
    //   //   }
    //   // } else {
    //   //   formData.append(key, formValue[key]);
    //   // }
    //   if (formValue[key] instanceof FileList) {
    //     // If the control is a file input, append each file to formData separately
    //     for (let i = 0; i < formValue[key].length; i++) {
    //       formData.append(key, formValue[key].item(i));
    //     }
    //   } else {
    //     formData.append(key, formValue[key]);
    //   }
    // });

    // return formData;
  }
}
