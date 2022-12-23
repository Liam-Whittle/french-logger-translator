import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { IVerbs } from '../models/iverbs.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-createverb',
  templateUrl: './createverb.component.html',
  styleUrls: ['./createverb.component.scss'],
})
export class CreateverbComponent implements OnInit {
  verbs: IVerbs[] = [];
  nameModel = "";

  constructor(private modalController: ModalController, private db: DatabaseService, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getVerbs().subscribe(vers => {
          this.verbs = vers;
        });
      }
    })
  }

  addVerbToDB() {
    this.db.addVerb(this.nameModel).then(data => {
      let verbId = data;
      if (verbId !== null) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
