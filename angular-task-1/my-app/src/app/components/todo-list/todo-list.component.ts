import { Component, OnInit, ViewChildren, OnDestroy } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodoListService } from 'src/app/services/todo-list/todo-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public todoListService: TodoListService
  ) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.sub = combineLatest(
      this.activatedRoute.params,
      this.todoListService.savedtodoList$
    ).subscribe(([params, todoList]: [Params, Todo[]]) => {
      // tslint:disable-next-line: radix
      const currentTodoId: number = params ? parseInt(params.id) : null;
      if (todoList) {
        const currentTodo: Todo = this.todoListService.todoList
          .find((todo: Todo) => todo.id === currentTodoId);
        if (currentTodo) {
          this.todoListService.selectTodo(currentTodo);
        } else {
          this.selectTodo(todoList[0].id);
        }
      }
    });
  }

  public selectTodo(todoId: number): void {
    this.router.navigate(['/todo', todoId]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
