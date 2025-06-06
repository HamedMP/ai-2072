'use client';
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { DSVRowString } from 'd3';

interface Data {
  Country: string;
  Value: number;
}

const D3Component = () => {
  useEffect(() => {
    d3.select('#chart').select('svg').remove();
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Parse the Data
    d3.csv<Data>(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
      function (data: DSVRowString<string>): Data | null {
        if (!data) return null;

        return {
          Country: data.Country,
          Value: +data.Value,
        };
      },
    ).then(function (data: Data[]) {
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d: Data) {
            return d.Country;
          }),
        )
        .padding(0.2);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end');

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll('mybar')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function (d) {
          return x(d.Country) ?? 0;
        })
        .attr('y', function (d) {
          return y(d.Value) ?? 0;
        })
        .attr('width', x.bandwidth())
        .attr('height', function (d) {
          return height - (y(d.Value) ?? 0);
        })
        .attr('fill', '#69b3a2');
    });
  }, []);

  return <div id="chart"></div>;
};

export { D3Component };
