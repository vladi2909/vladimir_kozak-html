import { Component, OnInit, Input, HostListener, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from '../../models/todo';
import { Subject } from 'rxjs';
import { TodoListService } from 'src/app/services/todo-list/todo-list.service';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input()
  public set todo(todo: Todo) {
    this.myTodo = todo;
  }
  public get todo(): Todo {
    return this.myTodo;
  }

  constructor(
    public todoListService: TodoListService
  ) {
   }

  @HostBinding('style.cursor')
  public get cursor(): string {
    return 'default';
  }

  public myTodo: Todo = null;
  public isEditMode = false;
  @Input()
  public index: number = null;
  @Input()
  public isTodoSelected = false;
  @Output()
  public inTodoSelect: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output()
  elementDeleted: EventEmitter<any> = new EventEmitter();

  public deleteElement() {
    this.elementDeleted.emit();
  }

  ngOnInit(): void {
  }

  @HostListener('click')
  public selectTodo(): void {
    this.inTodoSelect.emit(this.todo);
  }

  public editTodo(): void {
    this.isEditMode = !this.isEditMode;
  }

}
