const data = [1, 2, 3, 4, 5];
d3.select('body')
  .selectAll('p')
  .data(data)
  .enter()
  .append('p')
  .text((d) => d);

console.log(data);
