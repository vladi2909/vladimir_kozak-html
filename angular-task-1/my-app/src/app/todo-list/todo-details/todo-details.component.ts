import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoListService } from '../services/todo-list/todo-list.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {

  public get todo(): Todo {
    return this._todoListService.selectedTodo
  }

  constructor(
    private _todoListService: TodoListService
  ) { }

  ngOnInit(): void {
  }

}
