import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { MenuPageModule } from '../menu/menu.module';
import { DefineComponent } from './define.component';

@NgModule({
  declarations: [DefineComponent],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule,
    MenuPageModule
  ]
})
export class DefineModule { }
