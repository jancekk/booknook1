import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-nook',
    pathMatch: 'full'
    
  },
 
  {
    path: 'to-read',
    loadChildren: () => import('./to-read/to-read.module').then( m => m.ToReadPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-books',
    loadChildren: () => import('./my-books/my-books.module').then( m => m.MyBooksPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'book-nook',
    loadChildren: () => import('./book-nook/book-nook.module').then( m => m.BookNookPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'book-details',
    loadChildren: () => import('./to-read/fiction/book-details/book-details.module').then( m => m.BookDetailsPageModule)
  },
  {
    path: 'book-details/:id', 
    loadChildren: () => import('./to-read/fiction/book-details/book-details.module').then(m => m.BookDetailsPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/log-in/log-in.module').then( m => m.LogInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
