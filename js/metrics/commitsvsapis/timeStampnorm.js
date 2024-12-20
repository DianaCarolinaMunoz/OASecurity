

const MARGIN_APISL = { LEFT: 20, RIGHT: 10, TOP: 20, BOTTOM: 50 };
const WIDTH_APISL = 700 - MARGIN_APISL.LEFT - MARGIN_APISL.RIGHT;
const HEIGHT_APISL = 400 - MARGIN_APISL.TOP - MARGIN_APISL.BOTTOM;



const innerWidth_APISL = WIDTH_APISL - MARGIN_APISL.LEFT - MARGIN_APISL.RIGHT;
const innerHeight_APISL = HEIGHT_APISL - MARGIN_APISL.BOTTOM;


d3.csv("data/tablecommits_methodswithglobalsecurity_5.csv").then(data => {



    // Preprocesar los datos
    data.forEach(d => {
        d.apiSpec_id = +d.apiSpec_id;
        d.commit_id = +d.commit_id;
        d.timeStamp = new Date(d.timeStamp);

        // Convertir valores numéricos
        d.c_local_global = +d.c_local_global || 0; 
        d.c_local = +d.c_local || 0; 
        d.c_local_nolocal_global = +d.c_local_nolocal_global || 0; 
        d.c_nolocal_global = +d.c_nolocal_global || 0; 
        d.c_local_nolocal = +d.c_local_nolocal || 0; 
        d.c_nolocal = +d.c_nolocal || 0; 
        d.c_global = +d.c_global || 0;
        d.coas = +d.coas || 0;
        d.c_nooas = +d.c_nooas || 0;

        d.totalValue = 
            d.c_local_global + d.c_local + d.c_local_nolocal_global + 
            d.c_nolocal_global + d.c_local_nolocal + d.c_nolocal +
            d.c_global + d.coas + d.c_nooas;
    });


    






    const svg = drawConnectedScatterplot(data);

    // generating svg
    const svgString = getSVGString(svg.node());

    // Crear un enlace de descarga y hacer clic en él para descargar el archivo SVG
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Liberar el objeto URL
    window.URL.revokeObjectURL(url);

    function drawConnectedScatterplot(data) {
        const svg = d3.select("#commits-apis-norm")
            .append("svg")
            .attr("width", WIDTH_APISL)
            .attr("height", HEIGHT_APISL)
            .append("g")
            .attr("transform", `translate(${MARGIN_APISL.LEFT}, ${MARGIN_APISL.TOP})`);


            const apisToPlot = [157253, 149089, 84798, 377630, 262512, 642932, 205409, 351547, 
                                485250, 597077, 198418, 1195, 387299, 387300, 454175, 217397, 514115, 306347, 212873, 256472, 289813, 425764, 515686, 593784, 
                                51391, 171704, 617248, 617306, 19195, 52247, 540790, 466083, 26149, 580075, 636194, 639127, 120857, 433886, 153666, 334713, 344250,
                                100339, 517998, 367785, 424723, 188548, 191139, 239428, 268335, 337255, 480814, 667339, 219876, 534382, 554965, 169415, 233842,
                                409698, 491658, 580799, 639801, 331292, 514841, 179805, 7224, 272962, 251166, 265222, 267318, 306453, 306457, 306459, 339954];
            const filteredData = data.filter(d => apisToPlot.includes(d.apiSpec_id));
        
            // Normalizar timestamps
            const timeExtent = d3.extent(filteredData, d => d.timeStamp);
            const timeScale = d3.scaleTime()
                .domain(timeExtent)
                .range([0, 1]); // Normalizar de 0 a 1
        
            filteredData.forEach(d => {
                d.timeNormalized = timeScale(d.timeStamp);
            });
        
            console.log("Datos después de normalizar timestamps:", filteredData);
        
            // Crear un mapa de datos agrupados por `apiSpec_id`
            const groupedData = d3.group(filteredData, d => d.apiSpec_id);
        
            // Crear escalas
            const x = d3.scaleBand()
                .domain(Array.from(groupedData.keys()))  // Convertir las claves del Map a un array
                .range([MARGIN_APISL.LEFT, WIDTH_APISL - MARGIN_APISL.RIGHT])
                .padding(0.1);
        
            const y = d3.scaleLinear()
                .domain([0, 1]) // Escala normalizada de 0 a 1
                .range([HEIGHT_APISL - MARGIN_APISL.BOTTOM, MARGIN_APISL.TOP]);
        
            // Dibujar los puntos
            const metrics = [
                { key: "c_local_global", color: "#339900" },
                { key: "c_local", color: "#ace600" },
                { key: "c_local_nolocal_global", color: "#ccff33" },
                { key: "c_nolocal_global", color: "#ffff33" },
                { key: "c_local_nolocal", color: "#ffd966" },
                { key: "c_nolocal", color: "orange" },
                { key: "c_global", color: "#3B71CA" },
                { key: "coas", color: "blue" },
                { key: "c_nooas", color: "red" },
            ];
        
            svg.selectAll(".dot-group")
                .data(Array.from(groupedData.entries()))  // Convertir el Map a un array
                .enter()
                .append("g")
                .attr("class", "dot-group")
                .each(function ([apiSpec_id, commits]) {
                    console.log(`Procesando API ${apiSpec_id} con commits:`, commits);
        
                    const group = d3.select(this);
        
                    metrics.forEach(metric => {
                        console.log(`Procesando métrica ${metric.key} para API ${apiSpec_id}`);
        
                        commits.forEach(commit => {
                            if (commit[metric.key] != null && commit[metric.key] > 0) {
                                console.log(`Dibujando punto para métrica ${metric.key} con valor:`, commit[metric.key]);
        
                                // Dibujar un punto para cada métrica y `timeStamp`
                                group.append("circle")
                                    .attr("cx", x(apiSpec_id) + x.bandwidth() / 2)
                                    .attr("cy", y(commit.timeNormalized))
                                    .attr("r", 3)
                                    .attr("fill", metric.color)
                                    .style("stroke", "white");
                            }
                        });
                    });
                });


    // Ejes
    svg.append("g")
        .attr("transform", `translate(${MARGIN_APISL.LEFT}, 0)`)
        .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format(".2f")))
        .selectAll("text")
        .style("font-size", "12px")
        .attr("font-family", "Times New Roman");

    svg.append("g")
        .attr("transform", `translate(0, ${HEIGHT_APISL - MARGIN_APISL.BOTTOM})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .style("font-size", "10px");

            
           
        


    

      
      
      


    svg.append("line")
        .attr("x1", MARGIN_APISL.LEFT)
        .attr("y1", MARGIN_APISL.TOP)
        .attr("x2", MARGIN_APISL.LEFT)
        .attr("y2", innerHeight_APISL)
        .attr("stroke", "black")
        .attr("stroke-width", 0.3);

    svg.append("line")
        .attr("x1", MARGIN_APISL.LEFT )
        .attr("y1", innerHeight_APISL)
        .attr("x2", innerWidth_APISL + MARGIN_APISL.LEFT)
        .attr("y2", innerHeight_APISL)
        .attr("stroke", "black")
        .attr("stroke-width", 1.0);    
    
    
    svg.append("line")
            .attr("x1", MARGIN_APISL.LEFT)
            .attr("y1", MARGIN_APISL.TOP)
            .attr("x2", innerWidth_APISL + MARGIN_APISL.LEFT)
            .attr("y2", MARGIN_APISL.TOP)
            .attr("stroke", "black")
            .attr("stroke-width", 0.5);


    // svg.append("line")
    //         .attr("x1", WIDTH_APISL - MARGIN_APISL.RIGHT - MARGIN_APISL.LEFT)
    //         .attr("y1", 0)
    //         .attr("x2", 0)
    //         .attr("y2", 0)
    //         .attr("stroke", "black")
    //         .attr("stroke-width", 1);        

   

    svg.append("line")
            .attr("x1", innerWidth_APISL + MARGIN_APISL.LEFT)
            .attr("y1", MARGIN_APISL.TOP)
            .attr("x2", innerWidth_APISL + MARGIN_APISL.LEFT)
            .attr("y2", innerHeight_APISL - 200)
            .attr("stroke", "black")
            .attr("stroke-width", 0.5);





     

      



        

        return svg;
    }

    function getSVGString(svgNode) {
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgNode);
        svgString = svgString.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        return svgString;
    }

});
