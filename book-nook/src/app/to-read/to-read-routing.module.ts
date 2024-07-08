import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToReadPage } from './to-read.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ToReadPage, 
    children: [
      {
        path: 'fiction',
        loadChildren: () => import('./fiction/fiction.module').then( m => m.FictionPageModule)
      },
      {
        path: 'non-fiction',
        loadChildren: () => import('./non-fiction/non-fiction.module').then( m => m.NonFictionPageModule)
      },
      {
        path: '',
        redirectTo: '/to-read/tabs/fiction',
        pathMatch: 'full'
      },
    ]
  },
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToReadPageRoutingModule {}
