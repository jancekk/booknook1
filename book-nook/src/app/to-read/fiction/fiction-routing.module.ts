import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FictionPage } from './fiction.page';

const routes: Routes = [
  {
    path: '',
    component: FictionPage
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
export class FictionPageRoutingModule {}
