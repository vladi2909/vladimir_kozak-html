import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Todo } from '../todo-list/models/todo';
import { TodoListService } from './services/todo-list/todo-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    public todoListService: TodoListService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      // const currentTodoId
      // this.todoListService.selectTodo();
    });
  }

  public trigger(): void {}

}