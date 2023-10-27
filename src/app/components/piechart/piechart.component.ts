import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartEvent} from 'chart.js';
import { ActiveElement} from 'chart.js/dist/plugins/plugin.tooltip';
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit{
    @Input({ required: true }) labels!: string[];
    @Input({ required: true }) medals!: number[];

    constructor(private router: Router) {}

    ngOnInit(): void {
      const chartElement = document.getElementById('pie-chart') as HTMLCanvasElement;
      if (chartElement) {
        this.renderChart(this.labels, this.medals, chartElement);
      }
    }

      renderChart(labels: string[] , medals: number[], chartElement: HTMLCanvasElement ){

        const getOrCreateTooltip = (chart: { canvas: { parentNode: { querySelector: (arg0: string) => HTMLElement | null; appendChild: (arg0: HTMLElement) => void; }; }; }) => {
          let tooltipEl = chart.canvas.parentNode.querySelector('div');

          if (!tooltipEl) {
            // Create tooltip element
            tooltipEl = document.createElement('div');
            tooltipEl.style.background = '#04838f';
            tooltipEl.style.borderRadius = '8px';
            tooltipEl.style.color = 'white';
            tooltipEl.style.opacity = '1';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.transform = 'translate(-50%, 0)';
            tooltipEl.style.transition = 'all .1s ease';

            // Create element for tooltip table
            const table = document.createElement('table');
            table.style.margin = '0px';
            table.style.display = 'flex';
            table.style.flexDirection = 'column';
            table.style.alignItems = 'center';

            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
          }

          return tooltipEl;
        };

        const externalTooltipHandler = (context: { chart: any; tooltip: any; }) => {
          // Tooltip Element
          const {chart, tooltip} = context;
          const tooltipEl = getOrCreateTooltip(chart);

          // Hide if no tooltip
          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
          }

          // Set Text
          if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map((b: { lines: number; }) => b.lines);

            const tableHead = document.createElement('thead');

            titleLines.forEach((title: string) => {
              const tr = document.createElement('tr');
              tr.style.borderWidth = '0';

              const th = document.createElement('th');
              th.style.borderWidth = '0';
              const text = document.createTextNode(title);

              th.appendChild(text);
              tr.appendChild(th);
              tableHead.appendChild(tr);
            });

            const tableBody = document.createElement('tbody');
            bodyLines.forEach((body: string, i: string | number) => {
              //const colors = tooltip.labelColors[i];

              const span = document.createElement('span');
              //span.style.background = colors.backgroundColor;
              //span.style.borderColor = colors.borderColor;
              span.style.borderWidth = '2px';
              span.style.marginRight = '2px';
              span.style.height = '20px';
              span.style.width = '20px';
              span.style.display = 'inline-block';
              span.style.backgroundImage = 'url(/../assets/svgs/award.svg)';
              span.style.backgroundRepeat = 'no-repeat';

              const tr = document.createElement('tr');
              tr.style.backgroundColor = 'inherit';
              tr.style.borderWidth = '0'

              const td = document.createElement('td');
              td.style.backgroundColor = 'inherit';
              td.style.borderWidth = '0';
              td.style.display = 'flex';
              td.style.flexDirection = 'row';
              td.style.alignItems = 'center';

              const text = document.createTextNode(body);

              td.appendChild(span);
              td.appendChild(text);
              tr.appendChild(td);
              tableBody.appendChild(tr);
            });

            const tableRoot = tooltipEl.querySelector('table');

            // Remove old children
            while (tableRoot?.firstChild) {
              tableRoot.firstChild.remove();
            }

            // Add new children
            tableRoot?.appendChild(tableHead);
            tableRoot?.appendChild(tableBody);
          }

          const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
          chart.canvas.style.cursor = 'pointer';

          // Display, position, and set styles for font
          tooltipEl.style.opacity = '1';
          tooltipEl.style.left = positionX + tooltip.caretX + 'px';
          tooltipEl.style.top = positionY + tooltip.caretY + 'px';
          tooltipEl.style.font = tooltip.options.bodyFont.string;
          tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
        };

          const _chart = new Chart(chartElement, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                label: 'Number of Medals',
                data: medals,
              }]
            },
            options: {
              responsive: true,
              onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
                if (elements.length > 0) {
                  //console.log('elements', elements)
                  const clickedElementIndex = elements[0].index;
                  // Handle the click event for the specific slice of the pie!
                  //console.log('Clicked slice index:', clickedElementIndex);
                  //console.log('Clicked slice event:', event);
                    this.router.navigateByUrl(`${clickedElementIndex + 1}`);
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
