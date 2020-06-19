import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoListDataService } from '../todo-list-data/todo-list-data.service';
import { delay, takeUntil, take } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class TodoListService implements OnDestroy {

  public isLoading = true;
  public todoList: Todo[] = [];
  public savedtodoList$: ReplaySubject<Todo[]> = new ReplaySubject<Todo[]>(1);
  private dSubject$: Subject<boolean> = new Subject();
  public selectedTodo: Todo = null;
  public num = this.todoList.length + 1;
  public todoTitle: string;

  constructor(
    private todoListDataService: TodoListDataService
  ) {
    this.todoListDataService.todoList$
      .pipe(
        delay(1000),
        take(1),
        takeUntil(this.dSubject$)
      )
      .subscribe((todoList: Todo[]) => {
        this.initTodoList(todoList);
      });
  }

  ngOnDestroy() {
    this.dSubject$.next(true);
    this.dSubject$.complete();
  }

  private initTodoList(todoList: Todo[]): void {
    this.todoList = todoList;
    this.isLoading = false;
    this.todoTitle = '';
    this.savedtodoList$.next(this.todoList);
  }

  public selectTodo(todo: Todo) {
    if (this.canSelect(todo)) {
      this.selectedTodo = todo;
    }
  }

  public canSelect(todo: Todo): boolean {
    return Boolean(todo)
      && (!this.selectedTodo || this.selectedTodo.id !== todo.id);
  }

  public isTodoSelected(todo: Todo) {
    return Boolean(this.selectedTodo)
      && this.selectedTodo.equals(todo);
  }

  public addItem(todo: string) {
    if (todo !== '') {
      const date = new Date();
      this.todoList.push(new Todo(this.num, todo, false, date));
      this.num++;
      this.todoTitle = '';
    }
  }

  public onElementDeleted(element) {
    const index = this.todoList.findIndex((elt) => (elt === element));
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }

  public save(): void {
    this.todoList = this.todoList.map((todo: Todo) => {
      const currentTodo: Todo = this.todoList.find((otherTodo: Todo) => otherTodo.id === todo.id);
      return currentTodo || todo;
    });
    this.todoListDataService.saveTodoList(this.todoList);
  }


}
