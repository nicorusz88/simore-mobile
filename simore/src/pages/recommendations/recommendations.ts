import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecommendationService } from '../../providers/recommendation.service'
import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'page-recommendations',
  templateUrl: 'recommendations.html'
})
export class RecommendationsPage {

  recommendations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public recommendationService: RecommendationService) {
    
  }

  ionViewDidLoad() {
    this.recommendationService.all().subscribe(
      recommendations => {
        this.recommendations = recommendations;
        console.log(this.recommendations);
      },
      error => {
      }
    );
  }
 
}
