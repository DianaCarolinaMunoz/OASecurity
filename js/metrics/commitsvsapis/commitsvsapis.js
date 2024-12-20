

const MARGIN_APISL = { LEFT: 20, RIGHT: 10, TOP: 20, BOTTOM: 50 };
const WIDTH_APISL = 700 - MARGIN_APISL.LEFT - MARGIN_APISL.RIGHT;
const HEIGHT_APISL = 400 - MARGIN_APISL.TOP - MARGIN_APISL.BOTTOM;



const innerWidth_APISL = WIDTH_APISL - MARGIN_APISL.LEFT - MARGIN_APISL.RIGHT;
const innerHeight_APISL = HEIGHT_APISL - MARGIN_APISL.BOTTOM;


d3.csv("data/tablecommits_methodswithglobalsecurity_5.csv").then(data => {



    data.forEach(d => {
        d.apiSpec_id = +d.apiSpec_id;
        d.commit_id = +d.commit_id;
        d.timeStamp = new Date(d.timeStamp); 
       
        
        d.count_api_root_security_array = +d.count_api_root_security_array;
        
        //sw and oas
        d.count_security_definitions = +d.count_security_definitions;
        d.count_security_schemes = +d.count_security_schemes;
        
        //Level oas security:
        // d.security_combined = +d.security_combined;
        d.security_combined = +d.security_combined || 0; 



        //Commits
        //OAS and global
        d.c_local_global = parseInt(d.c_local_global); 
        d.c_local = parseInt(d.c_local); 
        d.c_local_nolocal_global = parseInt(d.c_local_nolocal_global); 
        d.c_nolocal_global = parseInt(d.c_nolocal_global); 
        d.c_local_nolocal = parseInt(d.c_local_nolocal); 
        d.c_nolocal = parseInt(d.c_nolocal); 
        d.c_global = parseInt(d.c_global); //solo global no paths
        d.coas = parseInt(d.coas); //secnopaths
        d.c_nooas = parseInt(d.c_nooas)
        

        //only OAS
       
        
        
        d.totalcommit_secd = d.c_local_nolocal_global + d.c_local_nolocal + d.c_local_global + d.c_local + d.c_nolocal_global + d.c_nolocal + d.c_global +  d.coas +  d.c_nooas;




    });

    


const groupedData = d3.rollup(
    data,
    group => ({
        totalc_local_nolocal_global_sum: d3.sum(group, d => +d.c_local_nolocal_global || 0), // Si es null o undefined, usa 0
        totalc_local_nolocal_sum: d3.sum(group, d => +d.c_local_nolocal || 0), // Lo mismo aquí
        totalc_local_global_sum: d3.sum(group, d => +d.c_local_global || 0),
        totalc_local_sum: d3.sum(group, d => +d.c_local || 0),
        totalc_nolocal_global_sum: d3.sum(group, d => +d.c_nolocal_global || 0),
        totalc_nolocal_sum: d3.sum(group, d => +d.c_nolocal || 0),

        totalc_global_sum: d3.sum(group, d => +d.c_global || 0),
        totalcoas_sum: d3.sum(group, d => +d.coas || 0),
        totalc_nooas_sum: d3.sum(group, d => +d.c_nooas || 0),




        // Cálculo de commits únicos por apiSpec_id
        totalcommit_id_count: new Set(group.map(d => d.commit_id)).size // Contamos commits únicos
    }),
    d => d.apiSpec_id // Agrupar por apiSpec_id
);

// Convertir el resultado agrupado en un arreglo para facilitar su uso
let aggregatedData = Array.from(groupedData, ([apiSpec_id, values]) => ({
    apiSpec_id,
    ...values
}));


const groups = [];
let groupIndex = 1; 



    const svg = drawConnectedScatterplot(aggregatedData);

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
        const svg = d3.select("#commits-apis-secure")
            .append("svg")
            .attr("width", WIDTH_APISL)
            .attr("height", HEIGHT_APISL)
            .append("g")
            .attr("transform", `translate(${MARGIN_APISL.LEFT}, ${MARGIN_APISL.TOP})`);
    
        // const apisToPlot = [251166, 262512, 157253, 261941, 106817, 196400, 250772, 320516, 384565, 445084, 449488, 501666, 518700, 149089, 84798];
        const apisToPlot = [157253, 149089, 84798, 377630, 262512, 642932, 205409, 351547, 
            485250, 597077, 198418, 1195, 387299, 387300, 454175, 217397, 514115, 306347, 212873, 256472, 289813, 425764, 515686, 593784, 
            51391, 171704, 617248, 617306, 19195, 52247, 540790, 466083, 26149, 580075, 636194, 639127, 120857, 433886, 153666, 334713, 344250,
            100339, 517998, 367785, 424723, 188548, 191139, 239428, 268335, 337255, 480814, 667339, 219876, 534382, 554965, 169415, 233842,
            409698, 491658, 580799, 639801, 331292, 514841, 179805, 7224, 272962, 251166, 265222, 267318, 306453, 306457, 306459, 339954];
        const filteredData = aggregatedData.filter(d => apisToPlot.includes(d.apiSpec_id));
    
        const metrics = [
            { key: "totalc_local_global_sum", color: "#339900" },
            { key: "totalc_local_nolocal_global_sum", color: "#ccff33" },
            { key: "totalc_local_nolocal_sum", color: "#ffd966" },
            { key: "totalc_local_sum", color: "#ace600" },
            { key: "totalc_nolocal_global_sum", color: "#ffff33" },
            { key: "totalc_nolocal_sum", color: "orange" },
            { key: "totalc_global_sum", color: "#3B71CA" },
            { key: "totalcoas_sum", color: "blue" },
            { key: "totalc_nooas_sum", color: "red" },
        ];
    
        // Calcular la suma total de cada API
        filteredData.forEach(d => {
            d.totalValue = 
                d.totalc_local_global_sum + 
                d.totalc_local_nolocal_global_sum + 
                d.totalc_local_nolocal_sum + 
                d.totalc_local_sum + 
                d.totalc_nolocal_global_sum + 
                d.totalc_nolocal_sum + 
                d.totalc_global_sum +
                d.totalcoas_sum +
                d.totalc_nooas_sum;
        });
    
        // Ordenar las APIs de mayor a menor según su suma total
        filteredData.sort((a, b) => b.totalValue - a.totalValue);  // Orden descendente
    
        // Crear una escala de `x` para las APIs (cada API en su posición)
        const x = d3.scaleBand()
            .domain(filteredData.map(d => d.apiSpec_id)) // Usar las APIs ordenadas
            .range([MARGIN_APISL.LEFT, WIDTH_APISL - MARGIN_APISL.RIGHT])
            .padding(0.1);
    
        // Crear la escala de `y` para los porcentajes (0 a 1)
        const y = d3.scaleLinear()
            .domain([0, 1])  // Dominio de 0 a 1 para representar porcentajes
            .range([HEIGHT_APISL - MARGIN_APISL.BOTTOM, MARGIN_APISL.TOP]);
    
        // Eje Y (porcentaje)
        svg.append("g")
            .attr("transform", `translate(${MARGIN_APISL.LEFT}, 0)`)
            .call(d3.axisLeft(y).ticks(10))
            .selectAll("text")
            .style("font-size", "12px")
            .attr("font-family", "Times New Roman");
    
 
         // Crear los puntos en lugar de las barras apiladas
    svg.selectAll(".stacked-dot")
    .data(filteredData)
    .enter()
    .append("g")
    .attr("class", "stacked-dot")
    .each(function(d) {
        let yOffset = 0; // El desplazamiento inicial en Y para cada barra

        // Para cada API, iteramos sobre las métricas y colocamos puntos
        metrics.forEach((metric, i) => {
            if (d[metric.key] > 0) { // Solo agregar puntos si el valor es mayor que 0
                // Calcular el porcentaje de la métrica
                const metricPercentage = d[metric.key] / d.totalValue;

                // Dibujar un punto (círculo) para cada métrica
                const numDots = 10; // Definir cuántos puntos poner para cada métrica (puedes ajustarlo)

                for (let i = 0; i < numDots; i++) {
                    // Calcular una posición `y` ligeramente desplazada para evitar la superposición exacta
                    const yPosition = y(yOffset + (metricPercentage * (i / numDots)));

                    d3.select(this)
                        .append("circle")
                        .attr("cx", x(d.apiSpec_id) + x.bandwidth() / 2) // Posición X centrada en cada API
                        .attr("cy", yPosition) // Posición Y calculada con el desplazamiento
                        .attr("r", 3) // Radio de cada punto (puedes ajustarlo)
                        .attr("fill", metric.color) // Asignar el color de la métrica
                        .style("stroke", "white"); // Borde blanco alrededor de cada punto
                }

                // Aumentar el desplazamiento para la siguiente sección de la métrica
                yOffset += metricPercentage;
            }
        });
    });
    

    svg.selectAll(".label")
        .data(filteredData)
        .enter()
        .append("text")
        .attr("x", d => x(d.apiSpec_id) + x.bandwidth() / 2) // Centrado en la barra
        .attr("y", HEIGHT_APISL - MARGIN_APISL.BOTTOM + 35) // Ubicación inicial de la etiqueta
        .attr("text-anchor", "end") // Cambiar el anclaje para rotación
        .attr("transform", d => 
            `rotate(90, ${x(d.apiSpec_id) + x.bandwidth() / 2}, ${HEIGHT_APISL - MARGIN_APISL.BOTTOM + 35})`
        ) // Rotar 90 grados alrededor del punto (x, y)
        .text(d => d.apiSpec_id) // Mostrar el `apiSpec_id` como etiqueta
        .style("font-size", "10px")
        .style("fill", "black");

    

      
      
      


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
