import { Injectable } from '@angular/core';
import { Todo } from 'src/app/todo-list/models/todo';
import { Observable, of, Subject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TodoListService } from '../todo-list/todo-list.service';
import { map, tap } from 'rxjs/operators';
import { TodoListSettings } from '../../models/todo-list-settings';
import { TodoListSnapshot } from '../../models/todo-list-snapshot';

@Injectable()
export class TodoListDataService {

  private static todoListLSKey: string = "todos";

  private _baseUrl: string = 'assets';

  public todoListSnapshot$: ReplaySubject<TodoListSnapshot> = new ReplaySubject<TodoListSnapshot>(1);

  constructor(
    private _httpClient: HttpClient
  ) { }

  public loadTodoList(): void {
    const LSData: string = localStorage.getItem(TodoListDataService.todoListLSKey);
    if (LSData) {
      this.todoListSnapshot$.next(
        TodoListSnapshot.fromJSON(JSON.parse(LSData))
      );
    } else {
      this._httpClient.get<Todo[]>(`${this._baseUrl}/todo-list.json`)
        .pipe(
          tap((json: any) => {
            this.todoListSnapshot$.next(
              new TodoListSnapshot(
                '',
                false,
                (json || []).filter(Boolean).map(Todo.fromJSON)
              )
            );
          })
        );
    }
  }

  public loadSettings(): Observable<TodoListSettings> {
    return this._httpClient.get<TodoListSettings>(`${this._baseUrl}/todo-list-settings.json`);

  }

  public save(uls: TodoListSnapshot): void {
    localStorage.setItem(
      TodoListDataService.todoListLSKey,
      JSON.stringify(
        TodoListSnapshot.toJSON(uls)
      )
    );
    this.loadTodoList();
  }

}
