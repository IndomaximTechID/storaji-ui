import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../services/utils.service';
import { NavbarComponent } from '../components/navbar.component';
import { SidebarComponent } from '../components/sidebar.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [NavbarComponent, SidebarComponent],
  providers: [ UtilsService ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    SidebarComponent,
    NguiAutoCompleteModule,
    TranslateModule
  ]
})
export class SharedModule { }
