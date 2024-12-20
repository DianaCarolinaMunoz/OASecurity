
const margin = { top: 20, right: 120, bottom: 40, left: 40 };  // márgenes para la gráfica
const width = 700 - margin.left - margin.right;  // ancho de la gráfica
const height = 400 - margin.top - margin.bottom;  // alto de la gráfica



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
            .attr("width", width + margin.left + margin.right + 100)  // Añadir espacio adicional para la barra de densidad
            .attr("height", height + margin.top + margin.bottom)  // Altura total
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");  // Desplazar el gráfico dentro de los márgenes
      
       
            // const svg = d3.create("svg")
            // .attr("width", WIDTH)
            // .attr("height", HEIGHT)   
       

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.totalmethod_secure)])
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.totalmethods)])
                .range([height, 0]);    

            svg.append("text")
                .attr("class", "x-axis-label")
                .attr("x", width / 2)
                .attr("y", height + 40)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .text("Number of Secured Operations");

            svg.append("text")
                .attr("class", "y-axis-label")
                .attr("x", -height / 2)
                .attr("y", -30)
                .attr("text-anchor", "middle")
                .attr("transform", "rotate(-90)")
                .attr("font-size", "16px")
                .text("Total Number of Operations");

            const xAxis = d3.axisBottom(x)
            .tickFormat(d3.format("d"))
            .tickSize(-height)
            .tickSizeOuter(0);

            const yAxis = d3.axisLeft(y)
                .tickSize(-width)
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
            

   




            // 3. Crear la escala de colores para la densidad
            const colorScale = d3.scaleLinear()
            .domain([0, 10, d3.max(data, d => d.totalmethod_secure)])  // Definir el dominio de la escala
            .range(["red", "green"]);  // Gradiente de color de morado a verde

            // 4. Crear la barra de densidad fuera del área de la gráfica (a la derecha)
            const densityBarWidth = 20;
            const densityBarHeight = height;  // Hacer que la barra tenga la misma altura que la gráfica

            // 5. Posicionar la barra de densidad fuera del gráfico
            const densityBar = svg.append("g")
            .attr("class", "density-bar")
            .attr("transform", "translate(" + (width + 40) + ", 0)");  // Desplazar la barra a la derecha

            // 6. Crear el rectángulo que representa la barra de densidad
            densityBar.append("rect")
            .attr("width", densityBarWidth)
            .attr("height", densityBarHeight)
            .attr("fill", "url(#gradient)");  // Aplicar el gradiente

            // 7. Crear el gradiente lineal de morado a verde para la barra de densidad
            const gradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

            gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "red");

            gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "green");

            // 8. Crear los círculos (puntos) y aplicar la escala de colores basada en la densidad
            svg.selectAll(".dot")
            
            .data(data.filter(d => d.totalmethod_secure !== 0 && d.totalmethods !== 0 && d.totalmethods !== 1 && d.totalmethods !== 2)) 

            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => x(d.totalmethod_secure))
            .attr("cy", d => y(d.totalmethods))
            .attr("r", 2)
            .style("fill", d => colorScale(d.totalmethod_secure))  // Colorear según la densidad
            .attr("stroke", "white");

            // 9. Detectar áreas de superposición y contar puntos usando d3.contourDensity
            const densityData = d3.contourDensity()
            .x(d => x(d.totalmethod_secure))
            .y(d => y(d.totalmethods))
            .size([width, height])  // Tamaño del área del gráfico
            .bandwidth(20)(data);

            // 10. Aplicar la densidad al color de los puntos
            svg.selectAll(".dot")
            .style("fill", d => {
                const density = densityData.find(density => d3.polygonContains(density.coordinates, [x(d.totalmethod_secure), y(d.totalmethods)]));
                const densityValue = density ? density.value : 0;
                return colorScale(densityValue);  // Cambiar el color según la densidad local
            });
                
             // Agregar líneas alrededor del gráfico
        // svg.append("line")
        //      .attr("x1", 0)
        //      .attr("y1", 0)
        //      .attr("x2", 0)
        //      .attr("y2", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP )
        //      .attr("stroke", "black")
        //      .attr("stroke-width", 1);

        //  svg.append("line")
        //      .attr("x1", 0)
        //      .attr("y1", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP+70)
        //      .attr("x2", WIDTH - MARGIN.RIGHT - MARGIN.LEFT+180)
        //      .attr("y2", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP+70)
        //      .attr("stroke", "black")
        //      .attr("stroke-width", 1);

        //  svg.append("line")
        //      .attr("x1", WIDTH - MARGIN.RIGHT - MARGIN.LEFT + 180)
        //      .attr("y1", HEIGHT - MARGIN.BOTTOM - MARGIN.TOP +70)
        //      .attr("x2", WIDTH - MARGIN.RIGHT - MARGIN.LEFT+180)
        //      .attr("y2", 0)
        //      .attr("stroke", "black")
        //      .attr("stroke-width", 1);

        //  svg.append("line")
        //      .attr("x1", WIDTH - MARGIN.RIGHT - MARGIN.LEFT+180)
        //      .attr("y1", 0)
        //      .attr("x2", 0)
        //      .attr("y2", 0)
        //      .attr("stroke", "black")
        //      .attr("stroke-width", 1);






            

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
 

