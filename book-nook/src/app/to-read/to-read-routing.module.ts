import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToReadPage } from './to-read.page';

const routes: Routes = [
  {
    path: '',
    component: ToReadPage, 
    
  },
  {
    path: ':bookId',
    loadChildren: () => import('./book-details/book-details.module').then( m => m.BookDetailsPageModule)
  }
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToReadPageRoutingModule {}
