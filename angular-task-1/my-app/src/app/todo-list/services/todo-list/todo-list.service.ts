import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/todo-list/models/todo';
import { TodoListDataService } from '../todo-list-data/todo-list-data.service';
import { delay, take, takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject, Subject, forkJoin, combineLatest } from 'rxjs';
import { TodoListSettings } from '../../models/todo-list-settings';
import { TodoListSnapshot } from '../../models/todo-list-snapshot';

export function toSaveLowerCase(value: string): string {
  return Boolean(value)
    ? String(value).toLowerCase()
    : '';
}
@Injectable()
export class TodoListService implements OnDestroy {

  public isLoading: boolean = true;

  public savedTodoList: Todo[] = [];
  public todoList: Todo[] = [];

  public savedTodoList$: ReplaySubject<Todo[]> = new ReplaySubject<Todo[]>(1);

  public settings: TodoListSettings = null;

  public selectedTodo: Todo = null;
  public todoSearch: string = '';
  public isTodoSortedByIncrease: boolean = false;

  private destroySubject$: Subject<boolean> = new Subject<boolean>();
  


  constructor(
    private _todoListDataService: TodoListDataService
  ) {
    this._todoListDataService.loadTodoList();
    combineLatest([
      this._todoListDataService.todoListSnapshot$
        .pipe(
          tap(() => {
            this.isLoading = true;
          }),
          delay(1000),
          takeUntil(this.destroySubject$)
        ),
      this._todoListDataService.loadSettings()
        .pipe(
          delay(2000),
          take(1),
          takeUntil(this.destroySubject$)
        )
    ]).subscribe(([uls, settings]: [TodoListSnapshot, TodoListSettings]) => {
      this.initTodoList(uls);
      this.settings = settings;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }

  private initTodoList(uls: TodoListSnapshot): void {
    this.todoSearch = uls.todoSearch;
    this.isTodoSortedByIncrease = uls.isSortedByIncrease;
    this.savedTodoList = uls.todoList;
    this.savedTodoList$.next(this.savedTodoList);
    this.search();
    this.sort();
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

  public sort(): void {
    this.todoList = this.todoList.sort((todo, otherTodo) => {
      const todoName: string = toSaveLowerCase(todo.name);
      const otherTodoName: string = toSaveLowerCase(otherTodo.name);
      const result: boolean = this.isTodoSortedByIncrease
        ? todoName < otherTodoName
        : todoName > otherTodoName
      return result ? 1 : -1;
    });
    this.isTodoSortedByIncrease = !this.isTodoSortedByIncrease;
  }

  public search(): void {
    if (this.todoSearch) {
      this.todoList = this.savedTodoList.filter((todo: Todo) => {
        return toSaveLowerCase(todo.name).includes(
          toSaveLowerCase(this.todoSearch)
        );
      });
    } else {
      this.todoList = [...this.savedTodoList];
    }
  }

  public save(): void {
    this.savedTodoList = this.savedTodoList.map((todo: Todo) => {
      const currentTodo: Todo = this.todoList.find((otherTodo: Todo) => otherTodo.id === todo.id);
      return currentTodo || todo;
    });
    this._todoListDataService.save(
      new TodoListSnapshot(
        this.todoSearch,
        this.isTodoSortedByIncrease,
        this.savedTodoList
      )
    );
  }

}
