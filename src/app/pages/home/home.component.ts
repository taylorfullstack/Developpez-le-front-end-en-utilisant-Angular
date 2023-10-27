import { Component} from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent{
  olympics$!: Olympic[];
  labels: string[] = [];
  medals: number[] = [];

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getChartData();
    //console.log("route", this.route);
  }

  getChartData(): void {
    this.olympicService.getOlympics().subscribe(olympics => {
      this.olympics$ = olympics;
      //console.log("olympics", this.olympics$);
      this.olympics$.forEach(country => {
        this.labels.push(country.country);
        this.medals.push(this.olympicService?.getTotalMedalsByCountryId(country.id));
      });
      //console.log("labels", this.labels);
      //console.log("medals", this.medals);
    });
  }
}
