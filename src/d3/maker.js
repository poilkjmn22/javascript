import * as d3 from 'd3';
function arrow() {
  return 'M0 0 L16 0 M8 4 L16 0 L8 -4';
}
function makeSymbols(svgBox) {
  if (!svgBox) throw '缺少svg元素容器！';
  var data = [
    { x: 40, y: 0, val: 'A' }, //<1>
    { x: 80, y: 30, val: 'A' },
    { x: 120, y: -10, val: 'B' },
    { x: 160, y: 15, val: 'A' },
    { x: 200, y: 0, val: 'C' },
    { x: 240, y: 10, val: 'B' },
  ];

  var symMkr = d3.symbol().size(81).type(d3.symbolStar); //<2>
  var scY = d3.scaleLinear().domain([-10, 30]).range([80, 40]); //<3>

  d3.select(svgBox)
    .append('g') //<4>
    .selectAll('path')
    .data(data)
    .enter()
    .append('path') //<5>
    .attr('d', arrow) //<6>
    .attr('fill', 'red')
    .attr(
      'transform', //<7>
      (d) => 'translate(' + d['x'] + ',' + scY(d['y']) + ')'
    );

  var scT = d3.scaleOrdinal(d3.symbols).domain(['A', 'B', 'C']); //<8>

  d3.select(svgBox)
    .append('g')
    .attr('transform', 'translate(300,0)') // <9>
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', (d) => symMkr.type(scT(d['val']))()) //<10>
    .attr('fill', 'none') //<11>
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr(
      'transform', //<12>
      (d) => 'translate(' + d['x'] + ',' + scY(d['y']) + ')'
    );
}

function makeLines(svgBox) {
  // Prepare a data set and scale it properly for plotting
  var ds = [
    [1, 1],
    [2, 2],
    [3, 4],
    [4, 4],
    [5, 2],
    [6, 2],
    [7, 3],
    [8, 1],
    [9, 2],
  ];
  var xSc = d3.scaleLinear().domain([1, 9]).range([50, 250]);
  var ySc = d3.scaleLinear().domain([0, 5]).range([175, 25]);
  ds = ds.map((d) => [xSc(d[0]), ySc(d[1])]); //<1>

  // Draw circles for the individual data points
  d3.select(svgBox)
    .append('g')
    .selectAll('circle') //<2>
    .data(ds)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', (d) => d[0])
    .attr('cy', (d) => d[1]);

  // Generate a line
  var lnMkr = d3.line(); //<3>
  d3.select(svgBox)
    .append('g')
    .append('path') //<4>
    .attr('d', lnMkr(ds)) //<5>
    .attr('fill', 'none')
    .attr('stroke', 'red'); //<6>
}

function makeCurves(svgBox) {
  var ds0 = [
    [1, 1],
    [2, 2],
    [2.5, 4],
    [3, 4],
    [4, 2],
    [4.5, 2.5],
    [5, 1.5],
  ];
  var scX = d3.scaleLinear().domain([1, 5]).range([0, 180]);
  var scY = d3.scaleLinear().domain([0, 4.5]).range([160, 0]);
  var ds = ds0.map((d) => [scX(d[0]), scY(d[1])]);
  var txtpos = [scX(3), scY(0)];

  var svg = d3.select(svgBox);

  svg
    .append('g')
    .attr('transform', 'translate( 40, 40 )')
    .call(liner, ds, d3.curveLinear, 'd3.curveLinear', txtpos);
  svg
    .append('g')
    .attr('transform', 'translate( 260, 40 )')
    .call(liner, ds, d3.curveNatural, 'd3.curveNatural', txtpos);
  svg
    .append('g')
    .attr('transform', 'translate( 480, 40 )')
    .call(liner, ds, d3.curveMonotoneX, 'd3.curveMonotoneX', txtpos);

  svg
    .append('g')
    .attr('transform', 'translate( 40, 250 )')
    .call(liner, ds, d3.curveStep, 'd3.curveStep', txtpos);
  svg
    .append('g')
    .attr('transform', 'translate( 260, 250 )')
    .call(liner, ds, d3.curveStepAfter, 'd3.curveStepAfter', txtpos);
  svg
    .append('g')
    .attr('transform', 'translate( 480, 250 )')
    .call(liner, ds, d3.curveStepBefore, 'd3.curveStepBefore', txtpos);

  // blue: val=0, ... red: val=1

  var vs = [1, 0.75, 0.5, 0.25, 0];
  svg
    .append('g')
    .attr('transform', 'translate( 40, 460 )')
    .call(
      liner,
      ds,
      vs.map((v) => d3.curveCardinal.tension(v)),
      'd3.curveCardinal',
      txtpos
    );
  svg
    .append('g')
    .attr('transform', 'translate( 260, 460 )')
    .call(
      liner,
      ds,
      vs.map((v) => d3.curveCatmullRom.alpha(v)),
      'd3.curveCatmullRom',
      txtpos
    );
  svg
    .append('g')
    .attr('transform', 'translate( 480, 460 )')
    .call(
      liner,
      ds,
      vs.map((v) => d3.curveBundle.beta(v)),
      'd3.curveBundle',
      txtpos
    )
    //   	.call( liner, ds, d3.curveBasisClosed, "", txtpos )
    .append('text')
    .attr('x', txtpos[0])
    .attr('y', scY(-0.5))
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10.5pt')
    .text('d3.curveBasis');
}

function liner(g, ds, curve, txt, pos) {
  if (!(curve instanceof Array)) {
    curve = [curve];
  }

  var sc = d3.scaleLinear().domain([0, 2, 4]).range(['red', 'magenta', 'blue']);

  var lnMkr = d3.line();
  for (var i = 0; i < curve.length; i++) {
    g.append('path')
      .attr('d', lnMkr.curve(curve[i])(ds))
      .attr('fill', 'none')
      .attr('stroke', sc(i));
  }

  g.selectAll('circle')
    .data(ds)
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', (d) => d[0])
    .attr('cy', (d) => d[1])
    .attr('fill', 'black');

  g.append('text')
    .attr('x', pos[0])
    .attr('y', pos[1])
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '10.5pt')
    .text(txt);
}

function makePie(svgBox) {
  var data = [
    { name: 'Jim', votes: 12 },
    { name: 'Sue', votes: 5 },
    { name: 'Bob', votes: 21 },
    { name: 'Ann', votes: 17 },
    { name: 'Dan', votes: 3 },
  ];

  var pie = d3
    .pie()
    .value((d) => d.votes)
    .padAngle(0.025)(data); //<1>

  var arcMkr = d3
    .arc()
    .innerRadius(50)
    .outerRadius(150) //<2>
    .cornerRadius(10);

  var scC = d3
    .scaleOrdinal(d3.schemePastel2) //<3>
    .domain(pie.map((d) => d.index)); //<4>

  var g = d3
    .select(svgBox) //<5>
    .append('g')
    .attr('transform', 'translate(300, 175)');

  g.selectAll('path')
    .data(pie)
    .enter()
    .append('path') //<6>
    .attr('d', arcMkr) //<7>
    .attr('fill', (d) => scC(d.index))
    .attr('stroke', 'grey');

  g.selectAll('text')
    .data(pie)
    .enter()
    .append('text') //<8>
    .text((d) => d.data.name) //<9>
    .attr('x', (d) => arcMkr.innerRadius(85).centroid(d)[0]) //<10>
    .attr('y', (d) => arcMkr.innerRadius(85).centroid(d)[1])
    .attr('font-family', 'sans-serif')
    .attr('font-size', 14)
    .attr('text-anchor', 'middle');
}

export { makeSymbols, makeLines, makeCurves, makePie };
