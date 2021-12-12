const w = 1500;
const h = 1000;
const svg = d3.select('svg').attr('width', 1500).attr('height', h);

const padding = 50;
const tooltip = d3
  .select('.container')
  .append('div')
  .attr('id', 'tooltip')
  .style('visibility', 'hidden')
  .style('width', 'auto')
  .style('height', 'auto')
  .style('position', 'fixed')
  .style('z-index', '10');

window.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const values = data.data;
      const dates = values.map((item) => new Date(item[0]));

      const xScale = d3
        .scaleLinear()
        .domain([0, values.length - 1])
        .range([padding, w - padding]);

      const heightScale = d3
        .scaleLinear()
        .domain([0, d3.max(values, (d) => d[1])])
        .range([0, h - 2 * padding]);

      const yAxisScale = d3
        .scaleLinear()
        .domain([0, d3.max(values, (d) => d[1])])
        .range([h - padding, padding]);

      const xAxisScale = d3
        .scaleTime()
        .domain([d3.min(dates), d3.max(dates)])
        .range([padding, w - padding]);

      const xAxis = d3.axisBottom(xAxisScale);
      const yAxis = d3.axisLeft(yAxisScale);

      svg
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('data-date', (d) => d[0])
        .attr('data-gdp', (d) => d[1])
        .attr('x', (d, i) => xScale(i))
        .attr('y', (d) => h - padding - heightScale(d[1]))
        .attr('width', (w - 2 * padding) / values.length)
        .attr('height', (d) => heightScale(d[1]))
        .on('mouseover', (e, d) => {
          tooltip.transition().style('visibility', 'visible');

          tooltip.text(`${d[0]} ${d[1]}`).attr('data-date', d[0]);
        })
        .on('mouseout', (e, d) => {
          tooltip.transition().style('visibility', 'hidden');
        })
        .on('mousemove', (e, d) => {
          console.log(e);
          const x = e.clientX;
          const y = e.clientY;

          tooltip.style('top', y - 20 + 'px').style('left', x + 20 + 'px');
        });

      svg
        .append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${h - padding})`)
        .call(xAxis);
      svg
        .append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${padding}, 0)`)
        .call(yAxis);
    });
});
