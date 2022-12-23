import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateComponent } from '../create/create.component';
import { IInvoiceHours } from '../models/iinvoice-hours.model';
import { IInvoice } from '../models/iinvoice.model';
import { DatabaseService } from '../services/database.service';
import { ToastController } from '@ionic/angular';
import { DefineComponent } from '../define/define.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public menu: string;
  invoices: IInvoice[] = [];
  invoicesPopulated: boolean;
  isItemAvailable = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private db: DatabaseService,
    private toastController: ToastController,
    private alertController: AlertController,
    private httpClient: HttpClient) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getInv().subscribe(invs => {
          this.invoices = invs;
          this.invoicePopulatedSwitch();
        });
      }
    })
    this.menu = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAllInvoiceNames();
    this.httpClient.get<any>('https://linguee-api.herokuapp.com/api?dst=en&q=test&src=fr').subscribe(data => {
    });
  }

  getItems(ev: any) {
    this.getAllInvoiceNames();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.invoices = this.invoices.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isItemAvailable = false;
        this.getAllInvoiceNames();
    }
}

  invoicePopulatedSwitch() {
    if (this.invoices.length > 0) {
      this.invoicesPopulated = true;
    }
    else if (this.invoices.length == 0) {
      this.invoicesPopulated = false;
    }
  }

  getAllInvoiceNames() {
    this.db.getInv().subscribe(data => {
      this.invoices = data;
    })
  }

  deleteInvoiceItem(item) {
    let currInvoice = this.invoices.find(x => x.id === item.id);
    this.db.deleteInvoiceByID(currInvoice.id).then(_ => {
      this.db.deleteInvoiceHoursByInvoice(currInvoice.id).then(_ => {
        console.log('successfully deleted word');       
        this.invoicePopulatedSwitch();
      });
    });
  }

  async openDefine(invoice: IInvoice){
    const modal = await this.modalController.create({
      component: DefineComponent,
      componentProps: {
        invoice
      }
    });

    await modal.present();
  }

  async presentAlertMultipleButtons(item) {
    const alert = await this.alertController.create({
      header: 'Delete Word',
      subHeader: 'Delete ' + item.name + ' ?',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }, {
          text: 'Yes',
          handler: () => {
            this.presentToast();
            this.deleteInvoiceItem(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Word Deleted.',
      duration: 2000
    });
    toast.present();
  }

  async redirectToCreate() {
    const modal = await this.modalController.create({
      component: CreateComponent,
    });

    modal.onDidDismiss().then(_ => {
      this.invoicePopulatedSwitch();
    });

    await modal.present();
  }
}
