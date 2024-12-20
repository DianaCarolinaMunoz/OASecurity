const MARGIN_APIU = { LEFT: 100, RIGHT: 10, TOP: 20, BOTTOM: 50 };
const WIDTH_APIU = 450 - MARGIN_APIU.LEFT - MARGIN_APIU.RIGHT;
const HEIGHT_APIU= 350 - MARGIN_APIU.TOP - MARGIN_APIU.BOTTOM;
const innerWidth_APIU = WIDTH_APIU - MARGIN_APIU.LEFT - MARGIN_APIU.RIGHT;
const innerHeight_APIU = HEIGHT_APIU- MARGIN_APIU.BOTTOM;




d3.json("data/commits_apis_oas_sw_classify.json").then(data => {

    data.forEach(d => {
       
        d.combinaciones_unicas = +d.combinaciones_unicas;
        d.cantidad_apis = +d.cantidad_apis; 
        
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

        const svg = d3.select('#apis-combination')
            .append("svg")
            .attr("width", WIDTH_APIU + MARGIN_APIU.LEFT + MARGIN_APIU.RIGHT)
            .attr("height", HEIGHT_APIU+ MARGIN_APIU.TOP + MARGIN_APIU.BOTTOM)
            .append("g")
            .attr("transform", `translate(${MARGIN_APIU.LEFT}, ${MARGIN_APIU.TOP})`);

        // const svg = d3.create("svg")   
        //     .attr("width", WIDTH_APIU + MARGIN_APIU.LEFT + MARGIN_APIU.RIGHT)
        //     .attr("height", HEIGHT_APIU+ MARGIN_APIU.TOP + MARGIN_APIU.BOTTOM)
           


// Agrupar los datos por 'combinaciones_unicas' usando d3.group()
const groupedData = d3.group(data, d => d.combinaciones_unicas);

// Calcular la suma de 'cantidad_apis' por cada grupo
const summedData = Array.from(groupedData, ([key, values]) => ({
  combinaciones_unicas: key,
  cantidad_apis: d3.sum(values, d => d.cantidad_apis)
}));

// Definir las escalas
const xScale = d3.scaleBand()
    .domain(summedData.map(d => d.combinaciones_unicas))  // Usar los valores únicos de 'combinaciones_unicas'
    .range([0, WIDTH_APIU])
    .padding(0.4);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(summedData, d => d.cantidad_apis)])  // Usar el valor máximo de 'cantidad_apis'
    .range([HEIGHT_APIU, 0]);

// Ejes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale).ticks(10);

// Crear las barras (rectángulos)
svg.selectAll("rect")
    .data(summedData)  // Usar los datos agregados
    .enter().append("rect")
    .attr("x", d => xScale(d.combinaciones_unicas))
    .attr("y", d => yScale(d.cantidad_apis))
    .attr("width", xScale.bandwidth())
    .attr("height", d => HEIGHT_APIU - yScale(d.cantidad_apis))
    .attr("fill", "lightgrey");

// Añadir los ejes
svg.append("g")
    .attr("transform", `translate(0, ${HEIGHT_APIU})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-family", "Times New Roman");

svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0,0)")  // Evita desplazamientos hacia la izquierda
    .call(yAxis);

svg.selectAll(".grid text")
    .style("font-size", "18px")
    .attr("font-family", "Times New Roman");

svg.append("text")
    .attr("class", "x-axis-label")
    .attr("x", WIDTH_APIU / 2)
    .attr("y", HEIGHT_APIU +34)
    .attr("text-anchor", "middle")
    .attr("font-size", "13px")
    .attr("font-family", "Times New Roman")
    .text("Granularity Level Combination");        

svg.append("text")
    .attr("class", "y-axis-label")
    .attr("x", -HEIGHT_APIU / 2)
    .attr("y", -75)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("font-size", "13px")
    .attr("font-family", "Times New Roman")
    .text("Number of APIs");        

// Añadir las etiquetas con las cantidades
svg.selectAll(".label")
    .data(summedData)  // Usar los datos agregados
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("font-size", "13px")
    .attr("font-family", "Times New Roman")
    .attr("x", d => xScale(d.combinaciones_unicas) + xScale.bandwidth() / 5)  // Centrar el texto sobre la barra
    .attr("y", d => yScale(d.cantidad_apis) - 5)  // Colocar el texto encima de la barra (ajustar el valor si es necesario)
    .text(d => d.cantidad_apis);
               

      
 

                return svg;
    }

    function getSVGString(svgNode) {
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        return svgString;
    }

});
