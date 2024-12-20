

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

            d.count_get = parseInt(d.count_get);
            d.count_post = parseInt(d.count_post);
            d.count_put = parseInt(d.count_put);
            d.count_delete = parseInt(d.count_delete);
            d.count_patch = parseInt(d.count_patch);
    
            d.totalmethods = d.count_get + d.count_post + d.count_put + d.count_delete;
    
            d.get_localandglobal = parseInt(d.get_localandglobal);
            d.get_onlylocal = parseInt(d.get_onlylocal);
            d.get_onlyglobal= parseInt(d.get_onlyglobal);
            d.get_nolocalnoglobal = parseInt(d.get_nolocalnoglobal);

            d.get_secure = d.get_localandglobal + d.get_onlylocal + d.get_onlyglobal;


            d.get_security_noc = parseInt(d.get_security_noc);


            d.get_no_security_noc = parseInt(d.get_no_security_noc);
    
            d.get_undefined = d.get_security_noc + d.get_no_security_noc;
       
    
            d.post_localandglobal = parseInt(d.post_localandglobal);
            d.post_onlylocal = parseInt(d.post_onlylocal);
            d.post_onlyglobal= parseInt(d.post_onlyglobal);
            d.post_nolocalnoglobal = parseInt(d.post_nolocalnoglobal);

            d.post_secure = d.post_localandglobal + d.post_onlylocal+ d.post_onlyglobal;

    
    
            d.post_security_noc = parseInt(d.post_security_noc);
            d.post_no_security_noc = parseInt(d.post_no_security_noc);
    
            d.post_undefined = d.post_security_noc + d.post_no_security_noc 
    
    
    
            d.put_localandglobal = parseInt(d.put_localandglobal);
            d.put_onlylocal = parseInt(d.put_onlylocal);
            d.put_onlyglobal= parseInt(d.put_onlyglobal);
            d.put_nolocalnoglobal = parseInt(d.put_nolocalnoglobal);

            d.put_secure = d.put_localandglobal + d.put_onlylocal+ d.put_onlyglobal;
    
    
            d.put_security_noc = parseInt(d.put_security_noc);
            d.put_no_security_noc = parseInt(d.put_no_security_noc);
    
            d.put_undefined = d.put_security_noc + d.put_no_security_noc
    
       
            d.delete_localandglobal = parseInt(d.delete_localandglobal);
            d.delete_onlylocal = parseInt(d.delete_onlylocal);
            d.delete_onlyglobal= parseInt(d.delete_onlyglobal);
            d.delete_nolocalnoglobal = parseInt(d.delete_nolocalnoglobal);

            d.delete_secure = d.delete_localandglobal + d.delete_onlylocal + d.delete_onlyglobal;

    
            d.delete_security_noc = parseInt(d.delete_security_noc);
            d.delete_no_security_noc = parseInt(d.delete_no_security_noc);
    
            d.delete_undefined = d.delete_security_noc + d.delete_no_security_noc;
    
    
            d.patch_localandglobal = parseInt(d.patch_localandglobal);
            d.patch_onlylocal = parseInt(d.patch_onlylocal);
            d.patch_onlyglobal= parseInt(d.patch_onlyglobal);
            d.patch_nolocalnoglobal = parseInt(d.patch_nolocalnoglobal);
    
            d.patch_secure = d.patch_localandglobal + d.patch_onlylocal + d.patch_onlyglobal;



            d.patch_security_noc = parseInt(d.patch_security_noc);
            d.patch_no_security_noc = parseInt(d.patch_no_security_noc);
    
            d.patch_undefined = d.patch_security_noc + d.patch_no_security_noc;


            d.totalmethod_secure = d.get_secure + d.post_secure + d.put_secure  +  d.delete_secure   + d.patch_secure;
            d.totalmethod_undefined = d.get_undefined + d.post_undefined + d.put_undefined + d.delete_undefined  + d.patch_undefined;



        });

        const svg = d3.select("#methods-securevsnonsecure")
            .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append("g")
            .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);
       
            // const svg = d3.create("svg")
            // .attr("width", WIDTH)
            // .attr("height", HEIGHT)   
       

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.totalmethod_secure)])
                .range([0, WIDTH]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.totalmethods)])
                .range([HEIGHT, 0]);    

            svg.append("text")
                .attr("class", "x-axis-label")
                .attr("x", WIDTH / 2)
                .attr("y", HEIGHT + 40)
                .attr("text-anchor", "middle")
                .attr("font-size", "13.33px")
                .text("Number of Secured Operations");

            svg.append("text")
                .attr("class", "y-axis-label")
                .attr("x", -HEIGHT / 2)
                .attr("y", -35)
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "13.33px")
                .text("Total Number of Operations");

            

            svg.selectAll(".dot")
                .data(data.filter(d => d.totalmethod_secure !== 0 && d.totalmethods !== 0 && d.totalmethods !== 1 && d.totalmethods !== 2)) 
                .enter().append("circle")
                .attr("class", "dot")
                .attr("cx", d => x(d.totalmethod_secure))
                .attr("cy", d => y(d.totalmethods))
                .attr("r", 2)
                .style("fill", d => d.totalmethod_secure >= 1 ? "green" : "purple") 
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

            //     // Agrupar los datos en dos categorías: "green" y "purple"
            // const groupedData = d3.group(data, d => d.totalmethod_secure >= 1 ? "green" : "purple");

            // // Calcular las densidades para cada grupocle
            // const densities = Array.from(groupedData, ([color, values]) => ({
            //     color: color,
            //     count: values.length
            // }));

            // // Escala para la densidad
            // const xDensity = d3.scaleBand()
            //     .domain(densities.map(d => d.color))
            //     .range([0, width]) // Ajusta al tamaño deseado de la barra
            //     .padding(0.2);

            // const yDensity = d3.scaleLinear()
            //     .domain([0, d3.max(densities, d => d.count)])
            //     .range([height, 0]);

            // // Crear las barras de densidad
            // svg.selectAll(".density-bar")
            //     .data(densities)
            //     .enter().append("rect")
            //     .attr("class", "density-bar")
            //     .attr("x", d => xDensity(d.color))
            //     .attr("y", d => yDensity(d.count))
            //     .attr("width", xDensity.bandwidth())
            //     .attr("height", d => height - yDensity(d.count))
            //     .style("fill", d => d.color);


            

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
 

