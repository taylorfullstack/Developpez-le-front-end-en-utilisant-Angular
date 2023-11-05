import { Component, OnInit} from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  olympics$!: Olympic[];
  labels: string[] = [];
  medals: number[] = [];
  totalGames!: number;
  totalCountries!: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getChartData();
  }

  getChartData(): void {
    this.olympicService.getOlympics().subscribe(olympics => {
      this.olympics$ = olympics;
      this.totalCountries = this.olympics$.length;
      const uniqueYears = [...new Set(this.olympics$.flatMap(item => item.participations.map(p => p.year)))];
      this.totalGames = uniqueYears.length;
      this.olympics$.forEach(country => {
        this.labels.push(country.country);
        this.medals.push(this.olympicService?.getTotalMedalsByCountryId(country.id));
      });
    });
  }
}
