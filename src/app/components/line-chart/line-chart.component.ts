import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { Participation } from 'src/app/core/models/Participation';
import { externalTooltipHandler } from 'src/app/core/utils/tooltip';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input({ required: true }) participations!: Participation[];

  ngOnInit(): void {
    const chartElement = document.getElementById('line-chart');
    const years = this.participations.map(participation => participation.year);
    const medals = this.participations.map(participation => participation.medalsCount);

    if (chartElement instanceof HTMLCanvasElement) {
      this.renderChart(years, medals, chartElement);
    }
  }

  renderChart(years: number[], medals: number[], chartElement: HTMLCanvasElement) {
    new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: 'Medals',
          data: medals,
          backgroundColor: "rgba(4,131,143,1)", //#04838f
          hoverBackgroundColor: "rgba(4,131,143,0.4)",
          borderColor: "black",
          hoverBorderColor: "black",
          borderWidth: 1,
          borderRadius: 5,
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dates',
              font: {
                size: 40,
                weight: 'normal',
                lineHeight: 1.2,
              },
            }
          },
          y: {
            beginAtZero: true,
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
        },
      }
    });
  }
}
