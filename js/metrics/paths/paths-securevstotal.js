

d3.csv("data/tablecommits_apis_security_oas.csv").then(data => {

    const svg = drawConnectedScatterplot(data);
    const svgString = getSVGString(svg.node());

  

    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.svg';
    // a.download = 'chart.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);


        
    function drawConnectedScatterplot(data) {

        

        data.forEach(d => {
            d.paths_total = parseInt(d.paths_total);
            d.paths_local_security = parseInt(d.paths_local_security);
            d.paths_nolocal_security = parseInt(d.paths_nolocal_security)
            // d.paths_total = Math.min(parseFloat(d.paths_total), maxPathsTotal);
            // d.totalFilteredPaths = Math.min(parseFloat(d.totalFilteredPaths), maxTotalFilteredPaths);
        });

        const svg = d3.select("#paths-securevsnonsecure")
            .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);
       
            // const svg = d3.create("svg")
            // .attr("width", WIDTH)
            // .attr("height", HEIGHT)   
       

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.paths_total)])
                .range([0, WIDTH]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.paths_total)])
                .range([HEIGHT, 0]);    

            svg.append("text")
                .attr("class", "x-axis-label")
                .attr("x", WIDTH / 2)
                .attr("y", HEIGHT + 40)
                .attr("text-anchor", "middle")
                .attr("font-size", "13.33px")
                .text("Total Paths");

            svg.append("text")
                .attr("class", "y-axis-label")
                .attr("x", -HEIGHT / 2)
                .attr("y", -45)
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "13.33px")
                .text("Paths with security scheme (local security)");

            

            svg.selectAll(".dot")
                // .data(data)
                .data(data.filter(d =>  d.paths_local_security !== 0 )) //&& d.paths_local_security !== 1 && d.paths_total !== 1 && d.paths_total !== 2 && d.paths_local_security !== 2 && d.paths_total !== 3 && d.paths_local_security !== 3
                .enter().append("circle")
                .attr("class", "dot")
                .attr("cx", d => x(d.paths_local_security))
                .attr("cy", d => y(d.paths_total))
                .attr("r", 2)
                .style("fill", "steelblue")
                .attr("stroke", "white")


                .on("mouseover", function(event, d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(`Count of Pct: ${d[0]}<br> API: ${d[1][0]["Row Labels"]} <br> StdDev of Pct: ${d3.mean(d[1], v => v["StdDev of Pct"])}`)
                        .style("left", (event.pageX) + "px")
                        .style("top", (event.pageY - 1) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            

            const xAxis = d3.axisBottom(x)
                .tickFormat(d3.format("d"))
                .tickSize(-HEIGHT)
                .tickSizeOuter(0);

            const yAxis = d3.axisLeft(y)
                .tickSize(-WIDTH)
                .tickSizeOuter(0);

          
    
            svg.append("g")
                .attr("class", "grid")
                .attr("transform", `translate(0, ${y(0)})`)
                .call(xAxis)
                .selectAll("line") // Seleccionar tanto las líneas como los textos dentro de los ticks
                .style("stroke", "#ddd") // Color de las líneas de la cuadrícula
                .style("stroke-width", 1) // Grosor de las líneas de la cuadrícula
                .style("shape-rendering", "crispEdges")
                .style("opacity", 0.5) // Opacidad de las líneas de la cuadrícula 
                svg.selectAll(".grid text")
                .style("text-anchor", "end") // Alineación del texto
                .attr("dx", "0em") // Desplazamiento horizontal
                .attr("dy", "1.45em") // Desplazamiento vertical
                .style("font-size", "13.33px");     

            // Agregar líneas de la cuadrícula para el eje y
            svg.append("g")
                .attr("class", "grid")
                .call(yAxis)
                .selectAll("line")
                .style("stroke", "#ddd") // Color de las líneas de la cuadrícula
                .style("stroke-width", 1) // Grosor de las líneas de la cuadrícula
                .style("shape-rendering", "crispEdges")
                .style("opacity", 0.5) //
                svg.selectAll(".grid text")
                .style("text-anchor", "end") // Alineación del texto
                // .attr("dx", "0em") // Desplazamiento horizontal
                // .attr("dy", "1.45em") // Desplazamiento vertical
                .style("font-size", "13.33px");       

       
             // Agregar líneas alrededor del gráfico
        // svg.append("line")
        //      .attr("x1", 0)
        //      .attr("y1", 0)
        //      .attr("x2", 0)
        //      .attr("y2", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP )
        //      .attr("stroke", "black")
        //      .attr("stroke-width", 1);

         svg.append("line")
             .attr("x1", 0)
             .attr("y1", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP+70)
             .attr("x2", WIDTH - MARGIN.RIGHT - MARGIN.LEFT+180)
             .attr("y2", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP+70)
             .attr("stroke", "black")
             .attr("stroke-width", 1);

         svg.append("line")
             .attr("x1", WIDTH - MARGIN.RIGHT - MARGIN.LEFT + 180)
             .attr("y1", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP +70)
             .attr("x2", WIDTH - MARGIN.RIGHT - MARGIN.LEFT+180)
             .attr("y2", 0)
             .attr("stroke", "black")
             .attr("stroke-width", 1);

         svg.append("line")
             .attr("x1", WIDTH - MARGIN.RIGHT - MARGIN.LEFT+180)
             .attr("y1", 0)
             .attr("x2", 0)
             .attr("y2", 0)
             .attr("stroke", "black")
             .attr("stroke-width", 1);






            

                return svg;

            }
        
        
            function getSVGString(svgNode) {
                const serializer = new XMLSerializer();
                let svgString = serializer.serializeToString(svgNode);
            
                // Verificar si el atributo xmlns ya está presente
                if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
                    svgString = svgString.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
                }
            
                return svgString;
            }
        




});
 

