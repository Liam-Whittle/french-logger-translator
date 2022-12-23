import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor
  (private db: DatabaseService,
   private alertController: AlertController,
   private toastController: ToastController) { }

  ngOnInit() {}

  //-- POTENTIAL SETTINGS --
  //Default name template e.g "Invoice " + whatever suffix you want  
  //Set Default Deducted tax percentage to replace placeholder for create modal field
  
  //-- DEBUG SETTING --
  deleteAllInvoices(){
   this.db.deleteAllInvoices();
  }
  deleteAllVerbs(){
   this.db.deleteAllVerbs();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Remove All Nouns?',
      subHeader: 'This action will remove all nouns from the dictionary?',
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
            this.deleteAllInvoices();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertMultipleButtons2() {
    const alert = await this.alertController.create({
      header: 'Remove All Verbs?',
      subHeader: 'This action will remove all verbs from the dictionary?',
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
            this.deleteAllVerbs();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Dictionary Reset.',
      duration: 2000
    });
    toast.present();
  }
}
