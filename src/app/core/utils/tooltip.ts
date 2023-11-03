import type { Chart, TooltipModel } from 'chart.js';

export const getOrCreateTooltip = (chart: Chart) => {
  let tooltipEl = chart.canvas?.parentNode?.querySelector('div');

  if (!tooltipEl) {
    // Create tooltip element
    tooltipEl = document.createElement('div');
    tooltipEl.classList.add('tooltip');
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
    chart.canvas?.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context: { chart: Chart; tooltip: TooltipModel<'pie'>; }) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  //console.log('context', context)
  //console.log('chart', chart)
  //console.log('tooltip', tooltip)
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = '0';
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: { lines: string[]}) => b.lines);

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
      bodyLines.forEach((body, _i) => {
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

        td.appendChild(span);

        const textNode = body.at(0);
        const text = document.createTextNode(textNode? textNode : '');
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
  //@ts-ignore
  //tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};
