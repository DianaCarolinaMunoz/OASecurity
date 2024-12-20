const MARGIN_MC = { LEFT: 100, RIGHT: 50, TOP: 20, BOTTOM: 70 };
const WIDTH_MC= 850 - MARGIN_MC.LEFT - MARGIN_MC.RIGHT;
const HEIGHT_MC= 700 - MARGIN_MC.TOP - MARGIN_MC.BOTTOM;
const innerWidth_MC= WIDTH_MC- MARGIN_MC.LEFT - MARGIN_MC.RIGHT;
const innerHeight_MC= HEIGHT_MC- MARGIN_MC.BOTTOM;

d3.csv("data/tablecommits_methodswithglobalsecurity_5.csv").then(data => {    
    
  
    data.forEach(d => {
        // Total
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


        d.get_security_noc = parseInt(d.get_security_noc);
        d.get_no_security_noc = parseInt(d.get_no_security_noc);

        d.get_undefined = d.get_security_noc + d.get_no_security_noc;
   

        d.post_localandglobal = parseInt(d.post_localandglobal);
        d.post_onlylocal = parseInt(d.post_onlylocal);
        d.post_onlyglobal= parseInt(d.post_onlyglobal);
        d.post_nolocalnoglobal = parseInt(d.post_nolocalnoglobal);


        d.post_security_noc = parseInt(d.post_security_noc);
        d.post_no_security_noc = parseInt(d.post_no_security_noc);

        d.post_undefined = d.post_security_noc + d.post_no_security_noc 



        d.put_localandglobal = parseInt(d.put_localandglobal);
        d.put_onlylocal = parseInt(d.put_onlylocal);
        d.put_onlyglobal= parseInt(d.put_onlyglobal);
        d.put_nolocalnoglobal = parseInt(d.put_nolocalnoglobal);


        d.put_security_noc = parseInt(d.put_security_noc);
        d.put_no_security_noc = parseInt(d.put_no_security_noc);

        d.put_undefined = d.put_security_noc + d.put_no_security_noc

   
        d.delete_localandglobal = parseInt(d.delete_localandglobal);
        d.delete_onlylocal = parseInt(d.delete_onlylocal);
        d.delete_onlyglobal= parseInt(d.delete_onlyglobal);
        d.delete_nolocalnoglobal = parseInt(d.delete_nolocalnoglobal);

        d.delete_security_noc = parseInt(d.delete_security_noc);
        d.delete_no_security_noc = parseInt(d.delete_no_security_noc);

        d.delete_undefined = d.delete_security_noc + d.delete_no_security_noc;


        d.patch_localandglobal = parseInt(d.patch_localandglobal);
        d.patch_onlylocal = parseInt(d.patch_onlylocal);
        d.patch_onlyglobal= parseInt(d.patch_onlyglobal);
        d.patch_nolocalnoglobal = parseInt(d.patch_nolocalnoglobal);

        d.patch_security_noc = parseInt(d.patch_security_noc);
        d.patch_no_security_noc = parseInt(d.patch_no_security_noc);

        d.patch_undefined = d.patch_security_noc + d.patch_no_security_noc;



   
    
    });

   
    
    const groupedData = d3.rollup(data,
        group => ({
            totalmethods: d3.sum(group, d => d.totalmethods),
            totalget: d3.sum(group, d => d.count_get),
            totalpost: d3.sum(group, d => d.count_post),
            totalput: d3.sum(group, d => d.count_put),
            totaldelete: d3.sum(group, d => d.count_delete),
    
            totalget_lgc: d3.sum(group, d => d.get_localandglobal), 
            totalget_l: d3.sum(group, d => d.get_onlylocal), 
            totalget_g: d3.sum(group, d => d.get_onlyglobal), 
            totalget_nlng: d3.sum(group, d => d.get_nolocalnoglobal), 
            totalget_un: d3.sum(group, d => d.get_undefined), 


    
            totalpost_lgc: d3.sum(group, d => d.post_localandglobal), 
            totalpost_l: d3.sum(group, d => d.post_onlylocal), 
            totalpost_g: d3.sum(group, d => d.post_onlyglobal), 
            totalpost_nlng: d3.sum(group, d => d.post_nolocalnoglobal), 
            totalpost_un: d3.sum(group, d => d.post_undefined), 
    
            totalput_lgc: d3.sum(group, d => d.put_localandglobal), 
            totalput_l: d3.sum(group, d => d.put_onlylocal), 
            totalput_g: d3.sum(group, d => d.put_onlyglobal), 
            totalput_nlng: d3.sum(group, d => d.put_nolocalnoglobal), 
            totalput_un: d3.sum(group, d => d.put_undefined), 

    
            totaldelete_lgc: d3.sum(group, d => d.delete_localandglobal), 
            totaldelete_l: d3.sum(group, d => d.delete_onlylocal), 
            totaldelete_g: d3.sum(group, d => d.delete_onlyglobal), 
            totaldelete_nlng: d3.sum(group, d => d.delete_nolocalnoglobal), 
            totaldelete_un: d3.sum(group, d => d.delete_undefined), 

            totalpatch_lgc: d3.sum(group, d => d.patch_localandglobal), 
            totalpatch_l: d3.sum(group, d => d.patch_onlylocal), 
            totalpatch_g: d3.sum(group, d => d.patch_onlyglobal), 
            totalpatch_nlng: d3.sum(group, d => d.patch_nolocalnoglobal), 
            totalpatch_un: d3.sum(group, d => d.patch_undefined), 

        })
    );
    

    const groupedDataArray = [groupedData]; // Si groupedData es un objeto simple
    console.log(groupedDataArray); // Verifica si contiene los datos que esperas

    console.log(groupedData);



    
    


    const svg = drawConnectedScatterplot(groupedDataArray);
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

    function drawConnectedScatterplot(groupedDataArray) {

        const svg = d3.select('#methods-cuantity')
            .append("svg")
            .attr("width", WIDTH_MC)
            .attr("height", HEIGHT_MC);

        // const svg = d3.create("svg")
        //     .attr("width", WIDTH_MC)
        //     .attr("height", HEIGHT_MC)     

       
        // const x = d3.scaleBand()
        //     // .domain(xAxisValues)
        //     .domain(aggregatedData.map(d => d.formattedTimeStamp))
        //     .range([MARGIN_MC.LEFT , innerWidth_MC+ MARGIN_MC.LEFT ])
        //     .padding(0.1);
        
        const barWidth = (innerWidth_MC/ groupedData.length) * 0.8; // Ancho de las barras, ajustado para tener espacio a ambos lados
        const barPadding = (innerWidth_MC/ groupedData.length) * 0.01; // Espacio entre las barras
         
     
        const metrics = {
            GET: [
                { key: "totalget_lgc", color: "#339900" },
                { key: "totalget_l", color: "#ace600" },
                { key: "totalget_g", color: "#ffff33" },
                { key: "totalget_nlng", color: "orange" },
                // { key: "totalget_un", color: "red" }
            ],
            POST: [
                { key: "totalpost_lgc", color: "#339900" },
                { key: "totalpost_l", color: "#ace600" },
                { key: "totalpost_g", color: "#ffff33" },
                { key: "totalpost_nlng", color: "orange" },
                // { key: "totalpost_un", color: "red" }
            ],
            
            DELETE: [
                { key: "totaldelete_lgc", color: "#339900" },
                { key: "totaldelete_l", color: "#ace600" },
                { key: "totaldelete_g", color: "#ffff33" },
                { key: "totaldelete_nlng", color: "orange" },
                // { key: "totaldelete_un", color: "red" },
            ],
            PUT: [
                { key: "totalput_lgc", color: "#339900" },
                { key: "totalput_l", color: "#ace600" },
                { key: "totalput_g", color: "#ffff33" },
                { key: "totalput_nlng", color: "orange" },
                // { key: "totalput_un", color: "red" }



            ],
            PATCH: [
                { key: "totalpatch_lgc", color: "#339900" },
                { key: "totalpatch_l", color: "#ace600" },
                { key: "totalpatch_g", color: "#ffff33" },
                { key: "totalpatch_nlng", color: "orange" },
                // { key: "totalpatch_un", color: "red" }

            ]
        };

//               // Encuentra el valor máximo para GET
// const maxGETValue = d3.max(groupedDataArray, d =>
//     d3.sum(metrics.GET, metric => d[metric.key] || 0)
// );

// // Encuentra el valor máximo para POST
// const maxPATCHValue = d3.max(groupedDataArray, d =>
//     d3.sum(metrics.PATCH, metric => d[metric.key] || 0)
// );

// // Define un factor de expansión para el valor máximo de POST
// const postExpansionFactor = 13.5; // Puedes ajustar este valor para mayor o menor expansión

// // Determina el valor máximo para el eje Y, con más expansión para POST
// const maxYValue = Math.max(maxGETValue, maxPATCHValue * postExpansionFactor);



// Encuentra el primer valor de Y (ajusta según la clave que necesites)
const firstYValue = d3.sum(metrics.POST, metric => groupedDataArray[0][metric.key] || 0);

const yExpansionFactor = 1.36; // Ajusta este valor para más o menos expansión
const maxYValue = firstYValue * yExpansionFactor;


        
        // Configuración del eje X con d3.scaleBand()
        const methods = Object.keys(metrics);
        const x = d3.scaleBand()
            .domain(methods)
            .range([MARGIN_MC.LEFT, innerWidth_MC + MARGIN_MC.LEFT - 6])
            .padding(0.1);
        
        // Calcular maxYValue correctamente usando groupedDataArray
        // const maxYValue = d3.max(groupedDataArray, d =>
        //     d3.sum(methods.flatMap(method => metrics[method]), metric => d[metric.key] || 0)
        // );

        // const maxYValue = d3.max(groupedDataArray, d => 
        //     d3.sum(metrics.GET, metric => d[metric.key])
        // );
        
        const y = d3.scaleLinear()
            .domain([0, maxYValue])
            .range([HEIGHT_MC - MARGIN_MC.BOTTOM, MARGIN_MC.TOP]);
        
            methods.forEach(method => {
                const metricGroup = metrics[method];
            
                svg.selectAll(`.bar-${method}`)
                    .data(groupedDataArray)
                    .enter()
                    .selectAll(`rect.${method}`)
                    .data(d => {
                        let yOffset = 0;
                        return metricGroup.map(metric => {
                            const value = d[metric.key] || 0;
                            const bar = { x: method, yOffset, value, color: metric.color };
                            yOffset += value;
                            return bar;
                        });
                    })
                    .enter()
                    .append("rect")
                    .attr("class", d => `bar-${d.x}`)
                    .attr("x", d => x(d.x))
                    .attr("y", d => y(d.yOffset + d.value))
                    .attr("height", d => y(d.yOffset) - y(d.yOffset + d.value))
                    .attr("width", x.bandwidth())
                    .attr("fill", d => d.color)
                    .style("stroke", "white");
            });

            // Crear el eje X
const xAxis = d3.axisBottom(x);
svg.append("g")
   .attr("transform", `translate(0,${HEIGHT_MC - MARGIN_MC.BOTTOM})`)
   .call(xAxis)
   .selectAll("text")
//    .attr("transform", "rotate(-45)") // Opcional, rota las etiquetas
   .style("text-anchor", "end");    // Ajusta la alineación del texto

// Crear el eje Y
const yAxis = d3.axisLeft(y);
svg.append("g")
   .attr("transform", `translate(${MARGIN_MC.LEFT},0)`)
   .call(yAxis);

            

            



        
           

        

            



      
        



        // svg.append("line")
        //     .attr("x1", MARGIN_MC.LEFT)
        //     .attr("y1", MARGIN_MC.TOP)
        //     .attr("x2", MARGIN_MC.LEFT)
        //     .attr("y2", innerHeight_MC)
        //     .attr("stroke", "black")
        //     .attr("stroke-width", 0.3);

        svg.append("line")
            .attr("x1", MARGIN_MC.LEFT )
            .attr("y1", innerHeight_MC)
            .attr("x2", innerWidth_MC+ MARGIN_MC.LEFT)
            .attr("y2", innerHeight_MC)
            .attr("stroke", "black")
            .attr("stroke-width", 1.0);    
        
        
        svg.append("line")
                .attr("x1", MARGIN_MC.LEFT)
                .attr("y1", MARGIN_MC.TOP)
                .attr("x2", innerWidth_MC+ MARGIN_MC.LEFT)
                .attr("y2", MARGIN_MC.TOP)
                .attr("stroke", "black")
                .attr("stroke-width", 0.5);

            svg.append("line")
                .attr("x1", innerWidth_MC+ MARGIN_MC.LEFT)
                .attr("y1", MARGIN_MC.TOP)
                .attr("x2", innerWidth_MC+ MARGIN_MC.LEFT)
                .attr("y2", innerHeight_MC)
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
