import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChildren, OnDestroy } from '@angular/core';
import { Todo } from '../todo-list/models/todo';
import { TodoListService } from './services/todo-list/todo-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { combineLatest, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  @ViewChildren(TodoComponent)
  public todoComponents: TodoComponent[];

  private sub: Subscription = null;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public todoListService: TodoListService
  ) {

  }

  ngOnInit(): void {
    this.sub = combineLatest(
      this._activatedRoute.params,
      this.todoListService.savedTodoList$
    ).subscribe(([params, todoList]: [Params, Todo[]]) => {
      const currentTodoId: number = params ? parseInt(params.id) : null;
      if (todoList && todoList.length > 0) {
        const currentTodo: Todo = todoList.find((todo: Todo) => todo.id === currentTodoId);
        if (currentTodo) {
          this.todoListService.selectTodo(currentTodo);
        } else {
          this.selectTodo(todoList[0].id);
        }
      }
    });
  }

  public selectTodo(todoId: number): void {
    this._router.navigate(['/todo', todoId]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}