import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListModule } from './todo-list/todo-list.module';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { TodoListRoutingModule } from './todo-list/todo-list-routing.module';
import { CanProceedContactsGuard } from './guards/can-proceed-contacts.guard';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TodoListModule,
    TodoListRoutingModule,
    AppRoutingModule
  ],
  exports: [AppComponent],
  providers: [
    CanProceedContactsGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
