import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderComponent } from './gender.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GenderComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GenderModule { }
