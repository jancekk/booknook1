import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooknookComponent } from './booknook/booknook.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { ToReadComponent } from './to-read/to-read.component';
import { BookFormComponent } from './book-form/book-form.component';

const routes: Routes = [
  { path: '', component: BooknookComponent, children: [{path:'new', component: BookFormComponent}] },
  { path: 'to_read', component: ToReadComponent, children: [{path: 'id/edit', component:  BookFormComponent}]},
  { path: 'my_books', component: MyBooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
