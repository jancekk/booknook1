import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBooksPageRoutingModule } from './my-books-routing.module';

import { MyBooksPage } from './my-books.page';
import { BookElementComponent } from '../to-read/book-element/book-element.component';
import { ToReadPageModule } from '../to-read/to-read.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBooksPageRoutingModule,
    ToReadPageModule
  ],
  declarations: [MyBooksPage],
})
export class MyBooksPageModule {}
