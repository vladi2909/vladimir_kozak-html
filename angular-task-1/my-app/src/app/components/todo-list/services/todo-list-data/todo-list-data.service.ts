import { Injectable } from '@angular/core';
import { Todo } from 'src/app/interfaces/Todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoListDataService {

  private _baseUrl: string = 'assets';

  

  constructor(
    private _httpClient: HttpClient
  ) { }


  public loadTodoList(): Observable<Todo[]> {
    return this._httpClient.get<Todo[]>(`${this._baseUrl}/todo-list.json`)
      // .pipe(
      //   map((json: any) => {
      //     return (json || []).map()
      //   })
      // );
  }
}
