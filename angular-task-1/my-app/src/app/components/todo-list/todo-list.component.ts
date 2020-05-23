import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Todo } from '../../interfaces/Todo';
import { TodoListService } from './services/todo-list/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(
    public todoListService: TodoListService
  ) { }

  ngOnInit(): void {
  }

  public trigger(): void {}

}