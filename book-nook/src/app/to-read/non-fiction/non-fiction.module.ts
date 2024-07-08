import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonFictionPageRoutingModule } from './non-fiction-routing.module';

import { NonFictionPage } from './non-fiction.page';
import { BookElementComponent } from '../book-element/book-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonFictionPageRoutingModule,
    
  ],
  declarations: [NonFictionPage]
})
export class NonFictionPageModule {}
