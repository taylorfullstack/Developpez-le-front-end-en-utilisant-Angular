import { Component, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit{
  olympics$!: Olympic[];
  country!: Olympic;
  totalMedals!: number;
  participations!: Participation[];
  athletes!: number;
  countryId!: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.countryId = +id; //convert string to number
    this.getLineChartData(+id);
  }

  getLineChartData(countryId: number): void {
    this.olympicService.getOlympics().subscribe(olympics => {
      this.olympics$ = olympics;
      try {
        this.country = this.olympicService.getOlympicById(countryId);
        this.totalMedals = this.olympicService.getTotalMedalsByCountryId(countryId);
        this.athletes = this.olympicService.getTotalAthletesByCountryId(countryId);
        this.participations = this.country.participations;
      } catch (error) {
        this.router.navigate(['**']);
      }
    });
  }
}
