import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookNookPageRoutingModule } from './book-nook-routing.module';

import { BookNookPage } from './book-nook.page';
import { AddbookModalComponent } from './addbook-modal/addbook-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookNookPageRoutingModule,
    
  ],
  
  declarations: [BookNookPage, AddbookModalComponent],
})
export class BookNookPageModule {}
