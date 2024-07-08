import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooknookPage } from './booknook.page';

const routes: Routes = [
  {
    path: '',
    component: BooknookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooknookPageRoutingModule {}
