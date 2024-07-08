import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooknookPageRoutingModule } from './booknook-routing.module';

import { BooknookPage } from './booknook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooknookPageRoutingModule
  ],
  declarations: [BooknookPage]
})
export class BooknookPageModule {}
