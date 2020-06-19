import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public name = '';
  public email = '';
  public password = '';

  constructor() { }

  ngOnInit(): void {
  }

  public signUp(models: any[]): void {
    models.forEach((model: any) => {
      console.log(model);
    });
  }

}
