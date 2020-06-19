import { Injectable } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class TodoListDataService {

  private static todoListLSKey = 'todos';

  private baseUrl = 'assets';

  public todoList$: Observable<Todo[]> = this.loadTodolist();

  constructor(
    private http: HttpClient
  ) { }

  private loadTodolist(): Observable<Todo[]> {
    const LSData: any = localStorage.getItem(TodoListDataService.todoListLSKey);
    if (LSData) {
      return of(
        (JSON.parse(LSData) || [])
        .filter(Boolean)
        .map(Todo.fromJSON)
        );
    } else {
      return this.http.get<Todo[]>(`${this.baseUrl}/todo-list.json`)
      .pipe(
        map((json: any) => {
          return (json || [])
            .filter(Boolean)
            .map(Todo.fromJSON);
        })
      );
    }

  }

  public saveTodoList(todoList: Todo[]): void {
    localStorage.setItem(
      TodoListDataService.todoListLSKey,
      JSON.stringify(
        todoList.map(Todo.toJSON)
      )
    );
  }
}
