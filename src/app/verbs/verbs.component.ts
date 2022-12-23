import { Component, OnInit } from '@angular/core';
import { IVerbs } from '../models/iverbs.model';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ConjugateComponent } from '../conjugate/conjugate.component';
import { ToastController } from '@ionic/angular';
import { CreateverbComponent } from '../createverb/createverb.component';

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
})
export class VerbsComponent implements OnInit {
  public verbstr: string;
  verbs: IVerbs[] = [];
  verbsPopulated: boolean;
  isItemAvailable = false;

  constructor(
    private db: DatabaseService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getVerbs().subscribe(vers => {
          this.verbs = vers;
          this.verbsPopulatedSwitch();
        });
      }
    })
    this.verbstr = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAllVerbNames();
  }
  getAllVerbNames() {
    this.db.getVerbs().subscribe(data => {
      this.verbs = data;
    })
  }

  getItems(ev: any) {
    this.getAllVerbNames();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
        this.isItemAvailable = true;
        this.verbs = this.verbs.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
    } else {
        this.isItemAvailable = false;
        this.getAllVerbNames();
    }
  }

  verbsPopulatedSwitch() {
    if (this.verbs.length > 0) {
      this.verbsPopulated = true;
    }
    else if (this.verbs.length == 0) {
      this.verbsPopulated = false;
    }
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
            this.deleteVerbItem(item);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteVerbItem(item) {
    let currVerb = this.verbs.find(x => x.id === item.id);
    this.db.deleteVerbByID(currVerb.id).then(_ => {
      this.verbsPopulatedSwitch();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Word Deleted.',
      duration: 2000
    });
    toast.present();
  }

  async openConjugate(verb: IVerbs){
    const modal = await this.modalController.create({
      component: ConjugateComponent,
      componentProps: {
        verb
      }
    });

    await modal.present();
  }

  async redirectToCreateVerb() {
    const modal = await this.modalController.create({
      component: CreateverbComponent,
    });

    modal.onDidDismiss().then(_ => {
      this.verbsPopulatedSwitch();
    });
    await modal.present();
  }

}
