import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthGuard } from '../../core/services/auth.guard';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'dashboard/products', canActivateChild: [AuthGuard],
        children: [
          { path: '', component: ProductsComponent },
          { path: ':id', component: OverviewComponent }
        ]
      },
    ])
  ],
  declarations: [
    ProductsComponent,
    AddComponent,
    EditComponent,
    OverviewComponent
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule,
    ProductsComponent,
    AddComponent,
    EditComponent,
    OverviewComponent
  ]

})
export class ProductsRoutingModule { }
