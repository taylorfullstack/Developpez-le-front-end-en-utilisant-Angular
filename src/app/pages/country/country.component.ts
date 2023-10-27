import { Component, OnInit } from '@angular/core';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent{
  country!: Olympic;
  totalMedals!: number;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const countryId = +this.route.snapshot.params['id'];
    this.country = this.olympicService.getOlympicById(countryId);
    this.totalMedals = this.olympicService.getTotalMedalsByCountryId(countryId);
  }
}
