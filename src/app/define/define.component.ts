import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IInvoice } from '../models/iinvoice.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss'],
})
export class DefineComponent implements OnInit {

  constructor(private modalController: ModalController, public loadingController: LoadingController, private httpClient: HttpClient) { }
  invoice: IInvoice;
  word: string = "";
  definition: string = "";
  ngOnInit() {
    this.presentLoading()
    this.httpClient.get<any>('https://linguee-api.herokuapp.com/api?dst=en&q=' + this.invoice.name + '&src=fr').subscribe(data => {
      this.word = data.query
      data.exact_matches.forEach(item => {
        item.translations.forEach(trans => {
          this.definition += "• " + trans.text + "\n "
        });
      });
    });
    console.log(this.word, "word var");
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Please Wait...',
        duration: 1600
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();

      console.log('dismissed');
    }
  }
