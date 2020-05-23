import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { TodoListService } from './services/todo-list/todo-list.service';
import { TodoListDataService } from './services/todo-list-data/todo-list-data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AutofocusFixModule.forRoot()
  ],
  providers: [
    TodoListService,
    TodoListDataService
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoListModule { }
