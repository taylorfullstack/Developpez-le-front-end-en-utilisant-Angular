import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartEvent} from 'chart.js';
import { ActiveElement} from 'chart.js/dist/plugins/plugin.tooltip';
import { externalTooltipHandler } from 'src/app/core/utils/tooltip';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
    @Input({ required: true }) labels!: string[];
    @Input({ required: true }) medals!: number[];

    accessibleColorPalette = ["#A8385D", "#7AA3E5", "#A27EA8", "#A6E9F4", "#ADCDED", "#A95963" ]

    constructor(private router: Router) {}

    ngOnInit(): void {
      const pieChartCanvas = document.getElementById('pie-chart');
      if(pieChartCanvas instanceof HTMLCanvasElement) {
        this.renderChart(pieChartCanvas);
      };
    }

    renderChart(chartElement: HTMLCanvasElement){
      new Chart(chartElement, {
        type: 'pie',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Number of Medals',
            backgroundColor: this.accessibleColorPalette,
            data: this.medals,
          }]
        },
        options: {
          onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
            if (elements.length > 0) {
              const clickedElementIndex = elements[0].index;
              const countryUrl = clickedElementIndex + 1;
                this.router.navigateByUrl(`olympic/${countryUrl}`);
            }
          },
          plugins: {
            tooltip: {
              enabled: false,
              external: externalTooltipHandler,
              callbacks: {
                title: function(context) {
                  return context[0].label;
                },
                label: function(context) {
                  return context.formattedValue;
                },
              },
            },
            legend: {
              display: true,
              position: 'top',
              align: 'center',
              labels: {
                  usePointStyle: true,
                  pointStyle: 'rectRounded',
                  padding: 20,
                  color: '#000',
                  font: {
                      size: 14
                  },
              },
            },
        },
        },
      });
    }
  }
