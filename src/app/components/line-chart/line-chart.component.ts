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
    console.log("participations", this.participations)
    const chartElement = document.getElementById('line-chart') as HTMLCanvasElement;
    const years = this.participations.map(participation => participation.year);
    const medals = this.participations.map(participation => participation.medalsCount);

    if (chartElement) {
      this.renderChart(years, medals, chartElement);
    }
  }

  /**
   * Type bar was user over type line.
   * The cahier de charges says to use either a line or bar chart.
   * The wireframes show a line chart.
   * I chose to use a bar chart because it fills out the chart.
   * The line chart does not fill out the chart and it looks like there is too much empty space.
   */
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
        scales: {
          x: {
            display: true,
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
