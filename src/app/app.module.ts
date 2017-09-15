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
    ElementsArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRouter,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
