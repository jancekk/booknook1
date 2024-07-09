import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToReadPage } from './to-read.page';

const routes: Routes = [
  {
    path: '',
    component: ToReadPage
  },
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToReadPageRoutingModule {}
