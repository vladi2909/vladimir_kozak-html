import { Injectable } from '@angular/core';
import { Todo } from 'src/app/interfaces/Todo';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TodoListService } from '../todo-list/todo-list.service';

@Injectable()
export class TodoListDataService {

  private static todoListLSKey: string = "todos";

  private _baseUrl: string = 'assets';

  public todoList$: Observable<Todo[]> = this.loadTodoList();

  constructor(
    private _httpClient: HttpClient
  ) { }


  private loadTodoList(): Observable<Todo[]> {
    const LSData: any = localStorage.getItem(TodoListDataService.todoListLSKey);
      if (LSData) {
        return of (
          (JSON.parse(LSData) || [])
          .filter(Boolean)
          .map(TodoListDataService.toJSON)
        );
      } else {
        return this._httpClient.get<Todo[]>(`${this._baseUrl}/todo-list.json`);
      }
  }
 
  public static toJSON(todos: Todo): any {
    return Boolean(todos)
      ? {
        id: todos.id,
        title: todos.title,
        completed: todos.completed,
        editing: todos.editing
      }
      : {};
  }

  public saveTodoList(todos: Todo[]): void {
    localStorage.setItem(
      TodoListDataService.todoListLSKey,
      JSON.stringify(
        todos.map(TodoListDataService.toJSON)
      )
    );
  }

}
