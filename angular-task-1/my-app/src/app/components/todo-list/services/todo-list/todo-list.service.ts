import { Injectable } from '@angular/core';
import { Todo } from 'src/app/interfaces/Todo';
import { TodoListDataService } from '../todo-list-data/todo-list-data.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class TodoListService {

  public isLoading: boolean = true;

  todos: Todo[];

  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;

  constructor(
    private _todoListDataService: TodoListDataService
  ) {
    this._todoListDataService.loadTodoList()
    .pipe(
      delay(1000)
    )
    .subscribe((todoList: Todo[]) => {
      this.initTodoList(todoList);
    });

    this.todoTitle = '';
    this.idForTodo = 1;
    this.todos = [];
    this.beforeEditCache = '';
   }

   private initTodoList(todoList: Todo[]): void {
    this.todos = todoList;
    this.isLoading = false;
  }

   addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    this.todoTitle = '';
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
  }

  // public static fromJSON(json: any): Todo {
  //   return Boolean(json)
  //     ? new Todo(json.id, json.title, json.completed, json.editing)
  //     : null;
  // }
}
