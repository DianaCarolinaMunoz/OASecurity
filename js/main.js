
const MARGIN = { LEFT: 100, RIGHT: 25, TOP: 20, BOTTOM: 50 };
const WIDTH = 950 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 580 - MARGIN.TOP - MARGIN.BOTTOM;

// const WIDTH = 950 - MARGIN.LEFT - MARGIN.RIGHT;
// const HEIGHT = 350 - MARGIN.TOP - MARGIN.BOTTOM;

const innerWidth = WIDTH - MARGIN.LEFT - MARGIN.RIGHT;
const innerHeight = HEIGHT - MARGIN.BOTTOM;


const colorScale = d3.scaleOrdinal()
    .domain(["header", "cookie", "query"])
    .range(["steelblue", "red", "yellow"]); 



const xScale = d3.scaleLinear()
    .range([0, WIDTH]);

const yScale = d3.scaleLinear()
    .range([HEIGHT, 0]);



const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);    




