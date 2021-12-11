const w = 1500;
const h = 1000;
const svg = d3.select('svg').attr('width', w).attr('height', h);
const padding = 50;

window.addEventListener('DOMContentLoaded', () => {
  fetch(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const values = data.data;

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
        .domain([
          new Date(values[0][0]),
          new Date(values[values.length - 1][0]),
        ])
        .range([padding, w - padding]);

      const xAxis = d3.axisBottom(xAxisScale);
      const yAxis = d3.axisLeft(yAxisScale);

      svg
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', (d) => h - padding - heightScale(d[1]))
        .attr('width', (w - 4 * padding) / values.length)
        .attr('height', (d) => heightScale(d[1]));

      svg
        .append('g')
        .attr('transform', `translate(0, ${h - padding})`)
        .call(xAxis);
      svg.append('g').attr('transform', `translate(${padding}, 0)`).call(yAxis);
    });
});
