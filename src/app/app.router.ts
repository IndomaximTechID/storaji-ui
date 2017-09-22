import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ElementsTablesComponent } from './elements/tables/tables.component';
import { ElementsArticlesComponent } from './elements/articles/articles.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';
import { AnonGuardService as AnonGuard } from './shared/services/anon-guard.service';
import { ProductsComponent } from './products/products.component';
import { ProductOverviewComponent } from './products/overview/overview.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, data: { title: 'Home'}, canActivate: [AuthGuard] },
    { path: 'dashboard', canActivateChild: [AuthGuard],
      children: [
        { path: 'tables', component: ElementsTablesComponent, data: { title: 'Elements Page: Tables'} },
        { path: 'articles', component: ElementsArticlesComponent, data: { title: 'Elements Page: Articles'} },
        { path: 'products', component: ProductsComponent, data: { title: 'Products'} },
        { path: 'products/:id', component: ProductOverviewComponent, data: { title: 'Product Overview'} }
      ]
    },
    { path: '404', component: ErrorComponent, data: { title: 'Not Found!'} },
    { path: 'login', component: LoginComponent, data: { title: 'Login Page'}, canActivate: [AnonGuard] },
    { path: 'register', component: RegisterComponent, data: { title: 'Register Page'}, canActivate: [AnonGuard] },
    { path: '**', component: ErrorComponent, data: { title: 'Not Found!'} },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [AuthGuard, AnonGuard]
})
export class AppRouter {}
