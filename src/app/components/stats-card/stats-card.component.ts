import { Component } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  title!: string | null;
  value!: number | null;
  //olympic: any;

  constructor(private olympicService: OlympicService) {

  }

  ngOnInit(): void {
    this.title = "Total Countries";
    this.value = 100;
  }

}
