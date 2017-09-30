import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { NavbarComponent } from '../components/navbar.component';
import { SidebarComponent } from '../components/sidebar.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { AutoCompleteService } from '../services/autocomplete.service';
import { StorajiAutocompleteModule } from './storaji-autocomplete.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StorajiAutocompleteModule
  ],
  declarations: [NavbarComponent, SidebarComponent],
  providers: [ UtilsService, AutoCompleteService ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    SidebarComponent,
    StorajiAutocompleteModule
  ]
})
export class SharedModule { }
