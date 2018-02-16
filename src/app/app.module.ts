import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar';
import { Config } from './shared/classes/app';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainModule } from './main/main.module';
import { TranslationModule } from './translation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgProgressModule,
    MainModule,
    AppRoutingModule,
    TranslationModule
  ],
  providers: [Title, Config],
  bootstrap: [AppComponent]
})
export class AppModule { }
