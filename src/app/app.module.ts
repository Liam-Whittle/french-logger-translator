import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateModule } from './create/create.module';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

import { HttpClientModule } from '@angular/common/http'
import { DatabaseService } from './services/database.service';
import { MenuPageModule } from './menu/menu.module';
import { DefineModule } from './define/define.module';
import { VerbsModule } from './verbs/verbs.module';
import { ConjugateModule } from './conjugate/conjugate.module';
import { CreateverbModule } from './createverb/createverb.module';
import { GenderModule } from './gender/gender.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CreateModule, HttpClientModule, MenuPageModule, DefineModule, CommonModule, VerbsModule, ConjugateModule, CreateverbModule, GenderModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLitePorter,
    SQLite,
    DatabaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
