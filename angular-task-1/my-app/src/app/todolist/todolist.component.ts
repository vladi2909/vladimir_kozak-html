import { Component, OnInit } from '@angular/core';
import { Note } from './note';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  public title: string = 'To Do List';

  public note: Note = new Note('1', 'start fit');
  public isNoteSaved: boolean = false;
  
  constructor() {
    this.note.name = 'Note';
   }

  ngOnInit(): void {
  }

  public save(note: Note): void {
    this.isNoteSaved = true;
  }

  public canSave(): boolean {
    return this.note
    && Boolean(this.note.name);
  }

  public noteChanged(event: Event): void {
    this.isNoteSaved = false;
  }

}
