import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToReadPageRoutingModule } from './to-read-routing.module';

import { ToReadPage } from './to-read.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToReadPageRoutingModule
  ],
  declarations: [ToReadPage]
})
export class ToReadPageModule {}
