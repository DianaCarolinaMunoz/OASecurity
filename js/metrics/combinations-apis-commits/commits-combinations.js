const MARGIN_COM = { LEFT: 100, RIGHT: 10, TOP: 20, BOTTOM: 30 };
const WIDTH_COM = 450 - MARGIN_COM.LEFT - MARGIN_COM.RIGHT;
const HEIGHT_COM = 250 - MARGIN_COM.TOP - MARGIN_COM.BOTTOM;
const innerWidth_COM = WIDTH_COM - MARGIN_COM.LEFT - MARGIN_COM.RIGHT;
const innerHeight_COM = HEIGHT_COM - MARGIN_COM.BOTTOM;

d3.json("data/commits_apis_oas_sw_classify.json").then(data => {

    data.forEach(d => {
        d.combinaciones_unicas = +d.combinaciones_unicas;
        d.frecuencia_total = +d.frecuencia_total; 
        
    });

    const svg = drawConnectedScatterplot(data);
    const svgString = getSVGString(svg.node());
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    function drawConnectedScatterplot(data) {

        const svg = d3.select('#commits-combination')
            .append("svg")
            .attr("width", WIDTH_COM + MARGIN_COM.LEFT + MARGIN_COM.RIGHT)
            .attr("height", HEIGHT_COM + MARGIN_COM.TOP + MARGIN_COM.BOTTOM)
            .append("g")
            .attr("transform", `translate(${MARGIN_COM.LEFT}, ${MARGIN_COM.TOP})`);


        //   const svg = d3.create("svg")   
        //     .attr("width", WIDTH_COM + MARGIN_COM.LEFT + MARGIN_COM.RIGHT)
        //     .attr("height", HEIGHT_COM + MARGIN_COM.TOP + MARGIN_COM.BOTTOM)
           
           
       
const groupedData = d3.group(data, d => d.combinaciones_unicas);

const summedData = Array.from(groupedData, ([key, values]) => ({
  combinaciones_unicas: key,
  frecuencia_total: d3.sum(values, d => d.frecuencia_total)
}));

const xScale = d3.scaleBand()
    .domain(summedData.map(d => d.combinaciones_unicas))  
    .range([0, WIDTH_COM])
    .padding(0.4);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(summedData, d => d.frecuencia_total)])  
    .range([HEIGHT_COM, 0]);


const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale).ticks(10);


svg.selectAll("rect")
    .data(summedData)  
    .enter().append("rect")
    .attr("x", d => xScale(d.combinaciones_unicas))
    .attr("y", d => yScale(d.frecuencia_total))
    .attr("width", xScale.bandwidth())
    .attr("height", d => HEIGHT_COM - yScale(d.frecuencia_total))
    .attr("fill", "black");


svg.append("g")
    .attr("transform", `translate(0, ${HEIGHT_COM})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-family", "Times New Roman");

svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0,0)")  
    .call(yAxis);

svg.selectAll(".grid text")
    .style("font-size", "18px")
    .attr("font-family", "Times New Roman");


svg.selectAll(".label")
    .data(summedData)  
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("font-size", "13px")
    .attr("font-family", "Times New Roman")
    .attr("x", d => xScale(d.combinaciones_unicas) + xScale.bandwidth() / 5)  
    .attr("y", d => yScale(d.frecuencia_total) - 5) 
    .text(d => d.frecuencia_total);
               

      
 

                return svg;
    }

    function getSVGString(svgNode) {
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        return svgString;
    }

});
