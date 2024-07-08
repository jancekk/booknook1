import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonFictionPage } from './non-fiction.page';

const routes: Routes = [
  {
    path: '',
    component: NonFictionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonFictionPageRoutingModule {}
