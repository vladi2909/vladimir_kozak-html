import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from '../todo/todo.component';
import { TodoListComponent } from './todo-list.component';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { TodoListService } from 'src/app/services/todo-list/todo-list.service';
import { TodoListDataService } from 'src/app/services/todo-list-data/todo-list-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AutofocusFixModule.forRoot()
  ],
  exports: [
    TodoListComponent
  ],
  providers: [
    TodoListService,
    TodoListDataService
  ]
})
export class TodoListModule { }
