import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FictionPageRoutingModule } from './fiction-routing.module';

import { FictionPage } from './fiction.page';
import { BookElementComponent } from '../book-element/book-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FictionPageRoutingModule
  ],
  declarations: [FictionPage, BookElementComponent]
})
export class FictionPageModule {}
