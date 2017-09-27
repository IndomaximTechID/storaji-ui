import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './shared/components/error.component';
import { AuthGuard } from './core/services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '404', component: ErrorComponent },
      { path: '**', component: ErrorComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [
    ErrorComponent
  ],
  providers: [AuthGuard],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
