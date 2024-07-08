import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookNookPage } from './book-nook.page';

const routes: Routes = [
  {
    path: '',
    component: BookNookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookNookPageRoutingModule {}
