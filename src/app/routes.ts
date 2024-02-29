import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ProductCreateComponent } from './product-create/product-create.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  },
  { path: 'product/create', component: ProductCreateComponent }
];

export default routeConfig;
