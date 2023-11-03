import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartEvent, TooltipModel} from 'chart.js';
import { ActiveElement} from 'chart.js/dist/plugins/plugin.tooltip';
import { getOrCreateTooltip, externalTooltipHandler } from 'src/app/core/utils/tooltip';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent {
    @Input({ required: true }) labels!: string[];
    @Input({ required: true }) medals!: number[];
    chartElement!: HTMLCanvasElement;
    chart!: Chart<'pie'>;
    accessibleColorPalette = ["#A8385D", "#7AA3E5", "#A27EA8", "#A6E9F4", "#ADCDED", "#A95963" ]

    constructor(private router: Router) {
    }

    ngOnInit(): void {
      const pieChartCanvas = document.getElementById('pie-chart');
      if(pieChartCanvas instanceof HTMLCanvasElement) {
        this.chartElement = pieChartCanvas;
        this.renderChart();
        console.log('this.chartElement', this.chartElement);
        console.log('this.chart', this.chart);
        //console.dir(this.chart);
        console.log('this.chart.legend', this.chart.legend);
        console.log('this.chart.chartArea', this.chart.chartArea);
        console.log('this.chart.legend.legendItems', this.chart.legend?.legendItems);
        console.log('canvas aspect ratio', this.chart.aspectRatio);
        console.log('canvas width', this.chart.canvas.getContext('2d')?.canvas.width);
        console.log('canvas height', this.chart.canvas.getContext('2d')?.canvas.height);
        console.log('canvas 2d conttext canvas', this.chart.canvas.getContext('2d')?.canvas);
        //this.chart.update("resize"); //attempt to address Issue #1 - doesn't resolve
      };
    }

    renderChart(){
      this.chart = new Chart(this.chartElement, {
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
          //maintainAspectRatio: true,
          //responsive: true,
          onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
            if (elements.length > 0) {
              const clickedElementIndex = elements[0].index;
              const countryUrl = clickedElementIndex + 1;
                this.router.navigateByUrl(`${countryUrl}`);
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
        },
      });
    }
  }
