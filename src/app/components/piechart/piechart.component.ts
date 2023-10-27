import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartEvent} from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit{

    @Input() labels!: string[];
    @Input() medals!: number[];

    //TODO : see if i can pass the router from the parent component too somehow
    constructor(private router: Router) {}

    ngOnInit(): void {
      this.renderChart(this.labels, this.medals);
      console.log(this.medals)
    }

      renderChart(labels: string[] , medals: number[]){

        const chartElement = document.getElementById('pie-chart');
        if (chartElement && labels && medals) {
          //console.log('medals in chart', medals)
          //console.log('labels in chart', labels)
          const chartElement = document.getElementById('pie-chart') as HTMLCanvasElement;
          const _chart = new Chart(chartElement, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                label: '# of Medals',
                data: medals,
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              onClick: (event: ChartEvent, elements: any[]) => {
                if (elements.length > 0) {
                  const clickedElementIndex = elements[0].index;
                  // Handle the click event for the specific slice of the pie!
                  console.log('Clicked slice index:', clickedElementIndex);
                    this.router.navigateByUrl(`${clickedElementIndex + 1}`);
                }
              }
            }
          });
          //console.log(_chart)
        }
      }
    }
