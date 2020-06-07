import { Component, OnInit, Input, HostListener, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoListService } from '../services/todo-list/todo-list.service';




@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  public myTodo: Todo = null;

  public isEditMode: boolean = false;

  @Input()
  public set todo(todo: Todo) {
    this.myTodo = todo;
  }

  public get todo(): Todo {
    return this.myTodo;
  }

  @Input()
  public index: number = null;

  @Input()
  public isTodoSelected: boolean = false;

  @Output()
  public onTodoSelect: EventEmitter<Todo> = new EventEmitter<Todo>();
  
  // public get changeDetectionCheck(): string {
  //   console.log('changeDetectionCheck');
  //   return 'check';
  // }

  constructor(
    public todoListService: TodoListService
  ) {
    
   }

  public editTodo(): void {
    this.isEditMode = !this.isEditMode;
  }

  ngOnInit(): void {
  }

  @HostListener('click')
  public selectTodo(): void {
    this.onTodoSelect.emit(this.todo);
  }

  @HostBinding('style.cursor')
  public get cursor(): string {
    return 'pointer';
  }

  

}
