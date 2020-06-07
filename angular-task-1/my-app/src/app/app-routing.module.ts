import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CanProceedContactsGuard } from './guards/can-proceed-contacts.guard';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [CanProceedContactsGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
