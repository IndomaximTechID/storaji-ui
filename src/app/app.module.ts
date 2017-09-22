import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouter } from './app.router';

import { Globals } from './globals';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ElementsTablesComponent } from './elements/tables/tables.component';
import { ElementsArticlesComponent } from './elements/articles/articles.component';

// http
import { HttpModule, Http } from '@angular/http';
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { UserService } from './shared/services/user.service';
import { ProductsComponent } from './products/products.component';
import { ProductOverviewComponent } from './products/overview/overview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ErrorComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    SidebarComponent,
    ElementsTablesComponent,
    ElementsArticlesComponent,
    ProductsComponent,
    ProductOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
    HttpModule,
    HttpClientModule
  ],
  providers: [Globals, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
