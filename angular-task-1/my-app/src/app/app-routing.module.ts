import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'todo',
    component: TodoListComponent
  },
  {
    path:'todo/:id',
    component: TodoListComponent
  },
  {
    path:'todo-list',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
