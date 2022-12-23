import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { IVerbs } from '../models/iverbs.model';

@Component({
  selector: 'app-conjugate',
  templateUrl: './conjugate.component.html',
  styleUrls: ['./conjugate.component.scss'],
})
export class ConjugateComponent implements OnInit {
  verb: IVerbs;
  def: string = "";

  //Var Groups:
  //Infinitives
  infPresent = "";
  infPast = "";

  //Participle
  partPresent = "";
  partPast = "";

  //Conditional
  condPassform1I = "";
  condPassform1You = "";
  condPassform1HeSheWe = "";
  condPassform1They = "";
  condPassform1YouFormal = "";
  condPassform1WeFormal = "";

  condPassform2I = "";
  condPassform2You = "";
  condPassform2HeSheWe = "";
  condPassform2They = "";
  condPassform2YouFormal = "";
  condPassform2WeFormal = "";

  condPresentI = "";
  condPresentYou = "";
  condPresentHeSheWe = "";
  condPresentThey = "";
  condPresentYouFormal = "";
  condPresentWeFormal = "";

  //Imperative
  impPast1 = "";
  impPast2 = "";
  impPast3 = "";

  impPresent1 = "";
  impPresent2 = "";
  impPresent3 = "";

  //Subjunctive
  subPresentI = "";
  subPresentYou = "";
  subPresentHeSheWe = "";
  subPresentThey = "";
  subPresentYouFormal = "";
  subPresentWeFormal = "";

  subPastI = "";
  subPastYou = "";
  subPastHeSheWe = "";
  subPastThey = "";
  subPastYouFormal = "";
  subPastWeFormal = "";

  subImperfectI = "";
  subImperfectYou = "";
  subImperfectHeSheWe = "";
  subImperfectThey = "";
  subImperfectYouFormal = "";
  subImperfectWeFormal = "";

  subPluperfectI = "";
  subPluperfectYou = "";
  subPluperfectHeSheWe = "";
  subPluperfectThey = "";
  subPluperfectYouFormal = "";
  subPluperfectWeFormal = "";

  //Indicative
  indPresentI = "";
  indPresentYou = "";
  indPresentHeSheWe = "";
  indPresentThey = "";
  indPresentYouFormal = "";
  indPresentWeFormal = "";

  indPresentperI = "";
  indPresentperYou = "";
  indPresentperHeSheWe = "";
  indPresentperThey = "";
  indPresentperYouFormal = "";
  indPresentperWeFormal = "";

  indImperfectI = "";
  indImperfectYou = "";
  indImperfectHeSheWe = "";
  indImperfectThey = "";
  indImperfectYouFormal = "";
  indImperfectWeFormal = "";

  indPluperfectI = "";
  indPluperfectYou = "";
  indPluperfectHeSheWe = "";
  indPluperfectThey = "";
  indPluperfectYouFormal = "";
  indPluperfectWeFormal = "";

  indSimppastI = "";
  indSimppastYou = "";
  indSimppastHeSheWe = "";
  indSimppastThey = "";
  indSimppastYouFormal = "";
  indSimppastWeFormal = "";

  indPastperI = "";
  indPastperYou = "";
  indPastperHeSheWe = "";
  indPastperThey = "";
  indPastperYouFormal = "";
  indPastperWeFormal = "";

  indSimpfutI = "";
  indSimpfutYou = "";
  indSimpfutHeSheWe = "";
  indSimpfutThey = "";
  indSimpfutYouFormal = "";
  indSimpfutWeFormal = "";

  indFutureperI = "";
  indFutureperYou = "";
  indFutureperHeSheWe = "";
  indFutureperThey = "";
  indFutureperYouFormal = "";
  indFutureperWeFormal = "";

  constructor(private httpClient: HttpClient, private modalController: ModalController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading()
    this.httpClient.get<any>('https://linguee-api.herokuapp.com/api?dst=en&q=' + this.verb.name + '&src=fr').subscribe(data => {
      this.def = data.exact_matches[0].translations[0].text
    });
    this.getConjugations();
  }

  getConjugations() {
    this.httpClient.get<any>(
      'https://french-conjugaison.p.rapidapi.com/conjugate/'+ this.verb.name,
      {
        headers: {
          "X-RapidAPI-Host": "french-conjugaison.p.rapidapi.com",
          "X-RapidAPI-Key": "xxAPI-Keyxx",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
      }
    ).pipe(
      catchError(this.handleError)
    ).subscribe(data => {

      console.log("api object data:", data);
      console.log("api object data-word:", data.data.word);
      console.log("infinitive data:", data.data.infinitive);
      console.log("type:", typeof data.data.imperatif.present);

      //infinitive data
      this.infPresent = data.data.infinitive.present;
      this.infPast = data.data.infinitive.passe;

      //participle data
      this.partPresent = data.data.participe.present;
      this.partPast = data.data.participe.passe;

      //imperative data
      this.impPast1 = data.data.imperatif.passe.imperatifPasseFirst;
      this.impPast2 = data.data.imperatif.passe.imperatifPasseSecond;
      this.impPast3 = data.data.imperatif.passe.imperatifPasseThird;

      this.impPresent1 = data.data.imperatif.present.imperatifPresentFirst;
      this.impPresent2 = data.data.imperatif.present.imperatifPresentSecond;
      this.impPresent3 = data.data.imperatif.present.imperatifPresentThird;

      //conditional data
      this.condPassform1I = data.data.conditionnel.passe1reForme.conditionnelPasse1reFormeI;
      this.condPassform1You = data.data.conditionnel.passe1reForme.conditionnelPasse1reFormeYou;
      this.condPassform1HeSheWe = data.data.conditionnel.passe1reForme.conditionnelPasse1reFormeHeSheIt;
      this.condPassform1They = data.data.conditionnel.passe1reForme.conditionnelPasse1reFormeThey;
      this.condPassform1YouFormal = data.data.conditionnel.passe1reForme.conditionnelPasse1reFormeYouAll;
      this.condPassform1WeFormal = data.data.conditionnel.passe1reForme.conditionnelPasse1reFormeWe;

      this.condPassform2I = data.data.conditionnel.passe2eForme.conditionnelPasse2eFormeI;
      this.condPassform2You = data.data.conditionnel.passe2eForme.conditionnelPasse2eFormeYou;
      this.condPassform2HeSheWe = data.data.conditionnel.passe2eForme.conditionnelPasse2eFormeHeSheIt;
      this.condPassform2They = data.data.conditionnel.passe2eForme.conditionnelPasse2eFormeThey;
      this.condPassform2YouFormal = data.data.conditionnel.passe2eForme.conditionnelPasse2eFormeYouAll;
      this.condPassform2WeFormal = data.data.conditionnel.passe2eForme.conditionnelPasse2eFormeWe;

      this.condPresentI = data.data.conditionnel.present.conditionnelPresentI;
      this.condPresentYou = data.data.conditionnel.present.conditionnelPresentYou;
      this.condPresentHeSheWe = data.data.conditionnel.present.conditionnelPresentHeSheIt;
      this.condPresentThey = data.data.conditionnel.present.conditionnelPresentThey;
      this.condPresentYouFormal = data.data.conditionnel.present.conditionnelPresentYouAll;
      this.condPresentWeFormal = data.data.conditionnel.present.conditionnelPresentWe;

      //subjunctive data
      this.subPresentI = data.data.subjonctif.present.subjonctifPresentI;
      this.subPresentYou = data.data.subjonctif.present.subjonctifPresentYou;
      this.subPresentHeSheWe = data.data.subjonctif.present.subjonctifPresentHeSheIt;
      this.subPresentThey = data.data.subjonctif.present.subjonctifPresentThey;
      this.subPresentYouFormal = data.data.subjonctif.present.subjonctifPresentYouAll;
      this.subPresentWeFormal = data.data.subjonctif.present.subjonctifPresentWe;

      this.subPastI = data.data.subjonctif.passe.subjonctifPasseI;
      this.subPastYou = data.data.subjonctif.passe.subjonctifPasseYou;
      this.subPastHeSheWe = data.data.subjonctif.passe.subjonctifPasseHeSheIt;
      this.subPastThey = data.data.subjonctif.passe.subjonctifPasseThey;
      this.subPastYouFormal = data.data.subjonctif.passe.subjonctifPasseYouAll;
      this.subPastWeFormal = data.data.subjonctif.passe.subjonctifPasseWe;

      this.subImperfectI = data.data.subjonctif.imparfait.subjonctifImparfaitI;
      this.subImperfectYou = data.data.subjonctif.imparfait.subjonctifImparfaitYou;
      this.subImperfectHeSheWe = data.data.subjonctif.imparfait.subjonctifImparfaitHeSheIt;
      this.subImperfectThey = data.data.subjonctif.imparfait.subjonctifImparfaitThey;
      this.subImperfectYouFormal = data.data.subjonctif.imparfait.subjonctifImparfaitYouAll;
      this.subImperfectWeFormal = data.data.subjonctif.imparfait.subjonctifImparfaitWe;

      this.subPluperfectI = data.data.subjonctif.plusQueParfait.subjonctifPlusQueParfaitI;
      this.subPluperfectYou = data.data.subjonctif.plusQueParfait.subjonctifPlusQueParfaitYou;
      this.subPluperfectHeSheWe = data.data.subjonctif.plusQueParfait.subjonctifPlusQueParfaitHeSheIt;
      this.subPluperfectThey = data.data.subjonctif.plusQueParfait.subjonctifPlusQueParfaitThey;
      this.subPluperfectYouFormal = data.data.subjonctif.plusQueParfait.subjonctifPlusQueParfaitYouAll;
      this.subPluperfectWeFormal = data.data.subjonctif.plusQueParfait.subjonctifPlusQueParfaitWe;

      //indicative data
      this.indPresentI = data.data.indicatif.present.indicatifPresentI;
      this.indPresentYou = data.data.indicatif.present.indicatifPresentYou;
      this.indPresentHeSheWe = data.data.indicatif.present.indicatifPresentHeSheIt;
      this.indPresentThey = data.data.indicatif.present.indicatifPresentThey;
      this.indPresentYouFormal = data.data.indicatif.present.indicatifPresentYouAll;
      this.indPresentWeFormal = data.data.indicatif.present.indicatifPresentWe;

      this.indPresentperI = data.data.indicatif.passeCompose.indicatifPasseComposeI;
      this.indPresentperYou = data.data.indicatif.passeCompose.indicatifPasseComposeYou;
      this.indPresentperHeSheWe = data.data.indicatif.passeCompose.indicatifPasseComposeHeSheIt;
      this.indPresentperThey = data.data.indicatif.passeCompose.indicatifPasseComposeThey;
      this.indPresentperYouFormal = data.data.indicatif.passeCompose.indicatifPasseComposeYouAll;
      this.indPresentperWeFormal = data.data.indicatif.passeCompose.indicatifPasseComposeWe;

      this.indImperfectI = data.data.indicatif.imparfait.indicatifImparfaitI;
      this.indImperfectYou = data.data.indicatif.imparfait.indicatifImparfaitYou;
      this.indImperfectHeSheWe = data.data.indicatif.imparfait.indicatifImparfaitHeSheIt;
      this.indImperfectThey = data.data.indicatif.imparfait.indicatifImparfaitThey;
      this.indImperfectYouFormal = data.data.indicatif.imparfait.indicatifImparfaitYouAll;
      this.indImperfectWeFormal = data.data.indicatif.imparfait.indicatifImparfaitWe;

      this.indPluperfectI = data.data.indicatif.plusQueParfait.indicatifPlusQueParfaitI;
      this.indPluperfectYou = data.data.indicatif.plusQueParfait.indicatifPlusQueParfaitYou;
      this.indPluperfectHeSheWe = data.data.indicatif.plusQueParfait.indicatifPlusQueParfaitHeSheIt;
      this.indPluperfectThey = data.data.indicatif.plusQueParfait.indicatifPlusQueParfaitThey;
      this.indPluperfectYouFormal = data.data.indicatif.plusQueParfait.indicatifPlusQueParfaitYouAll;
      this.indPluperfectWeFormal = data.data.indicatif.plusQueParfait.indicatifPlusQueParfaitWe;

      this.indSimppastI = data.data.indicatif.passeSimple.indicatifPasseSimpleI;
      this.indSimppastYou = data.data.indicatif.passeSimple.indicatifPasseSimpleYou;
      this.indSimppastHeSheWe = data.data.indicatif.passeSimple.indicatifPasseSimpleHeSheIt;
      this.indSimppastThey = data.data.indicatif.passeSimple.indicatifPasseSimpleThey;
      this.indSimppastYouFormal = data.data.indicatif.passeSimple.indicatifPasseSimpleYouAll;
      this.indSimppastWeFormal = data.data.indicatif.passeSimple.indicatifPasseSimpleWe;

      this.indPastperI = data.data.indicatif.passeAnterieur.indicatifPasseAnterieurI;
      this.indPastperYou = data.data.indicatif.passeAnterieur.indicatifPasseAnterieurYou;
      this.indPastperHeSheWe = data.data.indicatif.passeAnterieur.indicatifPasseAnterieurHeSheIt;
      this.indPastperThey = data.data.indicatif.passeAnterieur.indicatifPasseAnterieurThey;
      this.indPastperYouFormal = data.data.indicatif.passeAnterieur.indicatifPasseAnterieurYouAll;
      this.indPastperWeFormal = data.data.indicatif.passeAnterieur.indicatifPasseAnterieurWe;

      this.indSimpfutI = data.data.indicatif.futurSimple.indicatifFuturSimpleI;
      this.indSimpfutYou = data.data.indicatif.futurSimple.indicatifFuturSimpleYou;
      this.indSimpfutHeSheWe = data.data.indicatif.futurSimple.indicatifFuturSimpleHeSheIt;
      this.indSimpfutThey = data.data.indicatif.futurSimple.indicatifFuturSimpleThey;
      this.indSimpfutYouFormal = data.data.indicatif.futurSimple.indicatifFuturSimpleYouAll;
      this.indSimpfutWeFormal = data.data.indicatif.futurSimple.indicatifFuturSimpleWe;

      this.indFutureperI = data.data.indicatif.futurAnterieur.indicatifFuturAnterieurI;
      this.indFutureperYou = data.data.indicatif.futurAnterieur.indicatifFuturAnterieurYou;
      this.indFutureperHeSheWe = data.data.indicatif.futurAnterieur.indicatifFuturAnterieurHeSheIt;
      this.indFutureperThey = data.data.indicatif.futurAnterieur.indicatifFuturAnterieurThey;
      this.indFutureperYouFormal = data.data.indicatif.futurAnterieur.indicatifFuturAnterieurYouAll;
      this.indFutureperWeFormal = data.data.indicatif.futurAnterieur.indicatifFuturAnterieurWe;



      
    })
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

  closeModal() {
    this.modalController.dismiss();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
