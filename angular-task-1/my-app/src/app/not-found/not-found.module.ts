import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
      NotFoundComponent
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [],
  providers: [],
  bootstrap: [NotFoundComponent]
})
export class NotFoundModule { }
