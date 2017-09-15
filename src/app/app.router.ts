import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ElementsTablesComponent } from './elements/tables/tables.component';
import { ElementsArticlesComponent } from './elements/articles/articles.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, data: { title: 'Home'} },
    { path: '404.html', component: ErrorComponent, data: { title: 'Not Found!'} },
    { path: 'login.html', component: LoginComponent, data: { title: 'Login Page'} },
    { path: 'register.html', component: RegisterComponent, data: { title: 'Register Page'} },
    { path: 'tables.html', component: ElementsTablesComponent, data: { title: 'Elements Page: Tables'} },
    { path: 'articles.html', component: ElementsArticlesComponent, data: { title: 'Elements Page: Articles'} },
    { path: '**', component: ErrorComponent, data: { title: 'Not Found!'} },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRouter {}
