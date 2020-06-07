import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

const routes: Routes = [
    {
        path:'todo',
        component: TodoListComponent
      },
      {
        path:'todo/:id',
        component: TodoListComponent
      },
      {
        path:'todo/:id',
        component: TodoListComponent,
        children: [
            {
                path: 'details',
                component: TodoDetailsComponent
            }
        ]
      },
      {
        path:'todo-list',
        redirectTo: '/todo',
        pathMatch: 'full'
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoListRoutingModule { }
