import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent implements OnInit {
  searchWord = "";
  outputWord: string = "Search for a French word";
  genderOutput: string = "unknown";
  wordType: string = "";

  constructor(private httpClient: HttpClient, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  getGender() {
    this.httpClient.get<any>('https://linguee-api.herokuapp.com/api?dst=en&q=' + this.searchWord + '&src=fr').subscribe(data => {
      this.outputWord = data.query
      this.presentLoading()
      data.exact_matches.every(item => {
        this.genderOutput = item.word_type.gender
        if (this.genderOutput == null || this.genderOutput == "") {
          this.genderOutput = "not found";
          this.wordType = item.word_type.pos
        }
        return false
      });
      if (data.exact_matches.length == 0) {
        this.genderOutput = "not found";
        this.outputWord = "Invalid word";
        this.wordType = ""
      }
    },
      err => {
        this.genderOutput = "not found";
        this.outputWord = "Invalid word";
        this.wordType = ""
      }
    );
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

