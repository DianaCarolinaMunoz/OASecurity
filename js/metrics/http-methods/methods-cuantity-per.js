const MARGIN_MCP = { LEFT: 100, RIGHT: 50, TOP: 20, BOTTOM: 70 };
const WIDTH_MCP= 850 - MARGIN_MCP.LEFT - MARGIN_MCP.RIGHT;
const HEIGHT_MCP= 350 - MARGIN_MCP.TOP - MARGIN_MCP.BOTTOM;
const innerWidth_MCP= WIDTH_MCP- MARGIN_MCP.LEFT - MARGIN_MCP.RIGHT;
const innerHeight_MCP= HEIGHT_MCP- MARGIN_MCP.BOTTOM;

d3.csv("data/tablecommits_methodswithglobalsecurity_5.csv").then(data => {    
    
  
    data.forEach(d => {
        // Total
        d.count_get = parseInt(d.count_get);
        d.count_post = parseInt(d.count_post);
        d.count_put = parseInt(d.count_put);
        d.count_delete = parseInt(d.count_delete);
        d.count_patch = parseInt(d.count_patch);

        d.totalmethods = d.count_get + d.count_post + d.count_put + d.count_delete + d.count_patch;

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

    console.log(data);
   
    
    // const groupedData = d3.rollup(data,
    //     group => ({
    //         totalmethods: d3.sum(group, d => d.totalmethods),
    //         totalget: d3.sum(group, d => d.count_get),
    //         totalpost: d3.sum(group, d => d.count_post),
    //         totalput: d3.sum(group, d => d.count_put),
    //         totaldelete: d3.sum(group, d => d.count_delete),
    //         totalpatch: d3.sum(group, d => d.count_patch),

    
    //         totalget_lgc: d3.sum(group, d => d.get_localandglobal), 
    //         totalget_l: d3.sum(group, d => d.get_onlylocal), 
    //         totalget_g: d3.sum(group, d => d.get_onlyglobal), 
    //         totalget_nlng: d3.sum(group, d => d.get_nolocalnoglobal), 
    //         totalget_un: d3.sum(group, d => d.get_undefined), 
    
    //         totalpost_lgc: d3.sum(group, d => d.post_localandglobal), 
    //         totalpost_l: d3.sum(group, d => d.post_onlylocal), 
    //         totalpost_g: d3.sum(group, d => d.post_onlyglobal), 
    //         totalpost_nlng: d3.sum(group, d => d.post_nolocalnoglobal), 
    //         totalpost_un: d3.sum(group, d => d.post_undefined), 


    
    //         totalput_lgc: d3.sum(group, d => d.put_localandglobal), 
    //         totalput_l: d3.sum(group, d => d.put_onlylocal), 
    //         totalput_g: d3.sum(group, d => d.put_onlyglobal), 
    //         totalput_nlng: d3.sum(group, d => d.put_nolocalnoglobal), 
    //         totalput_un: d3.sum(group, d => d.put_undefined), 

    
    //         totaldelete_lgc: d3.sum(group, d => d.delete_localandglobal), 
    //         totaldelete_l: d3.sum(group, d => d.delete_onlylocal), 
    //         totaldelete_g: d3.sum(group, d => d.delete_onlyglobal), 
    //         totaldelete_nlng: d3.sum(group, d => d.delete_nolocalnoglobal), 
    //         totaldelete_un: d3.sum(group, d => d.delete_undefined), 


    //         totalpatch_lgc: d3.sum(group, d => d.patch_localandglobal), 
    //         totalpatch_l: d3.sum(group, d => d.patch_onlylocal), 
    //         totalpatch_g: d3.sum(group, d => d.patch_onlyglobal), 
    //         totalpatch_nlng: d3.sum(group, d => d.patch_nolocalnoglobal), 
    //         totalpatch_un: d3.sum(group, d => d.patch_undefined), 




    //     })
    // );

    const groupedData = d3.rollup(data,
        group => {
            // Cálculos para GET
            const totalget_lgc = d3.sum(group, d => d.get_localandglobal);
            const totalget_l = d3.sum(group, d => d.get_onlylocal);
            const totalget_g = d3.sum(group, d => d.get_onlyglobal);
            const totalget_nlng = d3.sum(group, d => d.get_nolocalnoglobal);
            const totalget_un = d3.sum(group, d => d.get_undefined);
            const totalget = totalget_lgc + totalget_l + totalget_g + totalget_nlng ;//+ totalget_un
    
            // Cálculos para POST
            const totalpost_lgc = d3.sum(group, d => d.post_localandglobal);
            const totalpost_l = d3.sum(group, d => d.post_onlylocal);
            const totalpost_g = d3.sum(group, d => d.post_onlyglobal);
            const totalpost_nlng = d3.sum(group, d => d.post_nolocalnoglobal);
            const totalpost_un = d3.sum(group, d => d.post_undefined);
            const totalpost = totalpost_lgc + totalpost_l + totalpost_g + totalpost_nlng ;//+ totalpost_un
    
            // Cálculos para PUT
            const totalput_lgc = d3.sum(group, d => d.put_localandglobal);
            const totalput_l = d3.sum(group, d => d.put_onlylocal);
            const totalput_g = d3.sum(group, d => d.put_onlyglobal);
            const totalput_nlng = d3.sum(group, d => d.put_nolocalnoglobal);
            const totalput_un = d3.sum(group, d => d.put_undefined);
            const totalput = totalput_lgc + totalput_l + totalput_g + totalput_nlng ; //+ totalput_un
    
            // Cálculos para DELETE
            const totaldelete_lgc = d3.sum(group, d => d.delete_localandglobal);
            const totaldelete_l = d3.sum(group, d => d.delete_onlylocal);
            const totaldelete_g = d3.sum(group, d => d.delete_onlyglobal);
            const totaldelete_nlng = d3.sum(group, d => d.delete_nolocalnoglobal);
            const totaldelete_un = d3.sum(group, d => d.delete_undefined);
            const totaldelete = totaldelete_lgc + totaldelete_l + totaldelete_g + totaldelete_nlng ;//+ totaldelete_un
    
            // Cálculos para PATCH
            const totalpatch_lgc = d3.sum(group, d => d.patch_localandglobal);
            const totalpatch_l = d3.sum(group, d => d.patch_onlylocal);
            const totalpatch_g = d3.sum(group, d => d.patch_onlyglobal);
            const totalpatch_nlng = d3.sum(group, d => d.patch_nolocalnoglobal);
            const totalpatch_un = d3.sum(group, d => d.patch_undefined);
            const totalpatch = totalpatch_lgc + totalpatch_l + totalpatch_g + totalpatch_nlng ; //+ totalpatch_un
    
            // Retornar el objeto con todos los resultados
            return {
                totalget_lgc,
                totalget_l,
                totalget_g,
                totalget_nlng,
                totalget_un,
                totalget,
                
                totalpost_lgc,
                totalpost_l,
                totalpost_g,
                totalpost_nlng,
                totalpost_un,
                totalpost,
    
                totalput_lgc,
                totalput_l,
                totalput_g,
                totalput_nlng,
                totalput_un,
                totalput,
    
                totaldelete_lgc,
                totaldelete_l,
                totaldelete_g,
                totaldelete_nlng,
                totaldelete_un,
                totaldelete,
    
                totalpatch_lgc,
                totalpatch_l,
                totalpatch_g,
                totalpatch_nlng,
                totalpatch_un,
                totalpatch
            };
        }
    );
    

console.log(groupedData); // Verifica si contiene los datos que esperas

// Convertir los datos agrupados en un array
const groupedDataArray = [groupedData]; // Si groupedData es un objeto simple


console.log(groupedDataArray); // Verifica si contiene los datos que esperas

// Calcular porcentajes con .map()
const percentageData = groupedDataArray.map(value => ({
    per_get_localandglobal: value.totalget !== 0 && !isNaN(value.totalget_lgc) && !isNaN(value.totalget) 
        ? value.totalget_lgc / value.totalget 
        : 0,

    per_get_onlylocal: value.totalget !== 0 && !isNaN(value.totalget_l) && !isNaN(value.totalget)
        ? value.totalget_l / value.totalget
        : 0,

    per_get_onlyglobal: value.totalget !== 0 && !isNaN(value.totalget_g) && !isNaN(value.totalget)
        ? value.totalget_g / value.totalget
        : 0,

    per_get_nolocalnoglobal: value.totalget !== 0 && !isNaN(value.totalget_nlng) && !isNaN(value.totalget)
        ? value.totalget_nlng / value.totalget
        : 0,

    per_get_un: value.totalget !== 0 && !isNaN(value.totalget_un) && !isNaN(value.totalget)
        ? value.totalget_un / value.totalget
        : 0,


    per_post_localandglobal: value.totalpost !== 0 && !isNaN(value.totalpost_lgc) && !isNaN(value.totalpost)
        ? value.totalpost_lgc / value.totalpost 
        : 0,

    per_post_onlylocal: value.totalpost !== 0 && !isNaN(value.totalpost_l) && !isNaN(value.totalpost)
        ? value.totalpost_l / value.totalpost
        : 0,

    per_post_onlyglobal: value.totalpost !== 0 && !isNaN(value.totalpost_g) && !isNaN(value.totalpost)
        ? value.totalpost_g / value.totalpost
        : 0,

    per_post_nolocalnoglobal: value.totalpost !== 0 && !isNaN(value.totalpost_nlng) && !isNaN(value.totalpost)
        ? value.totalpost_nlng / value.totalpost
        : 0,

    per_post_un: value.totalpost !== 0 && !isNaN(value.totalpost_un) && !isNaN(value.totalpost)
        ? value.totalpost_un / value.totalpost
        : 0,
            


    per_put_localandglobal: value.totalput !== 0 && !isNaN(value.totalput_lgc) && !isNaN(value.totalput)
        ? value.totalput_lgc / value.totalput
        : 0,

    per_put_onlylocal: value.totalput !== 0 && !isNaN(value.totalput_l) && !isNaN(value.totalput)
        ? value.totalput_l / value.totalput
        : 0,

    per_put_onlyglobal: value.totalput !== 0 && !isNaN(value.totalput_g) && !isNaN(value.totalput)
        ? value.totalput_g / value.totalput
        : 0,

    per_put_nolocalnoglobal: value.totalput !== 0 && !isNaN(value.totalput_nlng) && !isNaN(value.totalput)
        ? value.totalput_nlng / value.totalput
        : 0,


    per_put_un: value.totalput !== 0 && !isNaN(value.totalput_un) && !isNaN(value.totalput)
        ? value.totalput_un / value.totalput
        : 0,    

    per_delete_localandglobal: value.totaldelete !== 0 && !isNaN(value.totaldelete_lgc) && !isNaN(value.totaldelete)
        ? value.totaldelete_lgc / value.totaldelete
        : 0,

    per_delete_onlylocal: value.totaldelete !== 0 && !isNaN(value.totaldelete_l) && !isNaN(value.totaldelete)
        ? value.totaldelete_l / value.totaldelete
        : 0,

    per_delete_onlyglobal: value.totaldelete !== 0 && !isNaN(value.totaldelete_g) && !isNaN(value.totaldelete)
        ? value.totaldelete_g / value.totaldelete
        : 0,

    per_delete_nolocalnoglobal: value.totaldelete !== 0 && !isNaN(value.totaldelete_nlng) && !isNaN(value.totaldelete)
        ? value.totaldelete_nlng / value.totaldelete
        : 0,

    per_delete_un: value.totaldelete !== 0 && !isNaN(value.totaldelete_un) && !isNaN(value.totaldelete)
        ? value.totaldelete_un / value.totaldelete
        : 0,    

    per_patch_localandglobal: value.totalpatch !== 0 && !isNaN(value.totalpatch_lgc) && !isNaN(value.totalpatch)
        ? value.totalpatch_lgc / value.totalpatch
        : 0,

    per_patch_onlylocal: value.totalpatch !== 0 && !isNaN(value.totalpatch_l) && !isNaN(value.totalpatch)
        ? value.totalpatch_l / value.totalpatch
        : 0,

    per_patch_onlyglobal: value.totalpatch !== 0 && !isNaN(value.totalpatch_g) && !isNaN(value.totalpatch)
        ? value.totalpatch_g / value.totalpatch
        : 0,

    per_patch_nolocalnoglobal: value.totalpatch !== 0 && !isNaN(value.totalpatch_nlng) && !isNaN(value.totalpatch)
        ? value.totalpatch_nlng / value.totalpatch
        : 0,

    per_patch_un: value.totalpatch !== 0 && !isNaN(value.totalpatch_un) && !isNaN(value.totalpatch)
        ? value.totalpatch_un / value.totalpatch
        : 0    


        


}));


    

percentageData.forEach(d => {
    const totalGET = d.per_get_localandglobal + d.per_get_onlylocal + d.per_get_onlyglobal + d.per_get_nolocalnoglobal ;//+ d.per_get_un
    console.log("Total GET Percentage:", totalGET); // Debe estar cerca de 1
});

    const svg = drawConnectedScatterplot(percentageData);
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

    function drawConnectedScatterplot(percentageData) {

        const svg = d3.select('#methods-cuantity-per')
            .append("svg")
            .attr("width", WIDTH_MCP)
            .attr("height", HEIGHT_MCP);

        // const svg = d3.create("svg")
        //     .attr("width", WIDTH_MCP)
        //     .attr("height", HEIGHT_MCP)     

       
        // const x = d3.scaleBand()
        //     // .domain(xAxisValues)
        //     .domain(aggregatedData.map(d => d.formattedTimeStamp))
        //     .range([MARGIN_MCP.LEFT , innerWidth_MCP+ MARGIN_MCP.LEFT ])
        //     .padding(0.1);
        
       
     
        const metrics = {
            GET: [
                { key: "per_get_localandglobal", color: "#339900" },
                { key: "per_get_onlylocal", color: "#ace600" },
                { key: "per_get_onlyglobal", color: "#ffff33" },
                { key: "per_get_nolocalnoglobal", color: "orange" },
                // { key: "per_get_un", color: "red" }
            ],
            POST: [
                { key: "per_post_localandglobal", color: "#339900" },
                { key: "per_post_onlylocal", color: "#ace600" },
                { key: "per_post_onlyglobal", color: "#ffff33" },
                { key: "per_post_nolocalnoglobal", color: "orange" },
                // { key: "per_post_un", color: "red" }
            ],
            
            DELETE: [
                { key: "per_delete_localandglobal", color: "#339900" },
                { key: "per_delete_onlylocal", color: "#ace600" },
                { key: "per_delete_onlyglobal", color: "#ffff33" },
                { key: "per_delete_nolocalnoglobal", color: "orange" },
                // { key: "per_delete_un", color: "red" }
            ],
            PUT: [
                { key: "per_put_localandglobal", color: "#339900" },
                { key: "per_put_onlylocal", color: "#ace600" },
                { key: "per_put_onlyglobal", color: "#ffff33" },
                { key: "per_put_nolocalnoglobal", color: "orange" },
                // { key: "per_put_un", color: "red" }
            ],

            PATCH: [
                { key: "per_patch_localandglobal", color: "#339900" },
                { key: "per_patch_onlylocal", color: "#ace600" },
                { key: "per_patch_onlyglobal", color: "#ffff33" },
                { key: "per_patch_nolocalnoglobal", color: "orange" },
                // { key: "per_patch_un", color: "red" },
            ]
        };
        
        
        // Configuración del eje X con d3.scaleBand()
        const methods = Object.keys(metrics);
        const x = d3.scaleBand()
            .domain(methods)
            .range([MARGIN_MCP.LEFT, innerWidth_MCP + MARGIN_MCP.LEFT ])
            .padding(0.1);
        
        // // Configuración del eje Y (escala de 0 a 1 para los porcentajes)
        // const y = d3.scaleLinear()
        //     .domain([0, 1]) // El dominio de la escala y es de 0 a 1 (porcentaje)
        //     .range([innerHeight_MCP, MARGIN_MCP.TOP]); // Invertido para que el 0 esté abajo

        const y = d3.scaleLinear()
            .domain([0, 1])
            .range([innerHeight_MCP, MARGIN_MCP.TOP]);

        
        // Escala de colores para cada segmento (usando d3.scaleOrdinal)
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);  // O puedes usar una paleta personalizada
        
        // Crear las barras apiladas para cada método
        methods.forEach(method => {
            const metricGroup = metrics[method];
        
            // svg.selectAll(`.bar-${method}`)
            //     .data(percentageData)
            //     .enter()
            //     .selectAll(`rect.${method}`)
            //     .data(d => {
            //         let yOffset = 0;
            //         return metricGroup.map(metric => {
            //             const value = d[metric.key] || 0;
        
            //             // Asegurar que 'value' sea >= 0
            //             const barHeight = Math.max(0, value);
        
            //             // Crear el objeto bar
            //             const bar = {
            //                 x: method,
            //                 yOffset,
            //                 value: barHeight,
            //                 color: metric.color
            //             };
        
            //             // Actualizar yOffset
            //             yOffset += barHeight;
        
            //             return bar;
            //         });


            svg.selectAll(`.bar-${method}`)
            .data(percentageData)
            .enter()
            .selectAll(`rect.${method}`)
            .data(d => {
                let yOffset = 0;
                return metricGroup.map(metric => {
                    const value = d[metric.key] || 0;
        
                    // Asegurar que 'value' sea >= 0
                    const barHeight = Math.max(0, value);
        
                    // Crear el objeto bar
                    const bar = {
                        x: method,
                        yOffset,
                        value: barHeight,
                        color: metric.color
                    };
        
                    // Actualizar yOffset
                    yOffset += barHeight;
        
                    return bar;
                });
          
        


                })
                .enter()
                .append("rect")
                .attr("class", d => `bar-${d.x}`)
                .attr("x", d => x(d.x))
                .attr("y", d => y(d.yOffset + d.value))
                // .attr("height", d => Math.max(0, y(d.yOffset) - y(d.yOffset + d.value))) // Asegura que la altura no sea negativa
                .attr("height", d => Math.max(0, y(d.yOffset) - y(d.yOffset + d.value)))

                .attr("width", x.bandwidth())
                .attr("fill", d => d.color)
                .style("stroke", "white");
        });
        
        
        // Crear el eje X
        const xAxis = d3.axisBottom(x);
            svg.append("g")
            .attr("transform", `translate(0,${HEIGHT_MCP - MARGIN_MCP.BOTTOM})`)
            .call(xAxis)
            .selectAll("text")
            // .attr("transform", "rotate(-45)") // Opcional: rota las etiquetas para mejor visualización
            .style("text-anchor", "end");    // Ajusta la alineación del texto

            const yAxis = d3.axisLeft(y)
            .tickValues([0, 0.25, 0.5, 0.75, 1])  // Definir explícitamente los ticks ([0, 0.25, 0.5, 0.75, 1])
            .tickFormat(d3.format(".2f"));  // Opcional, para asegurar que se muestran con el formato adecuado
        
        
        svg.append("g")
           .attr("transform", `translate(${MARGIN_MCP.LEFT},0)`)
           .call(yAxis);
        
        // Agregar título de los ejes (opcional)
        svg.append("text")
            // .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight_MCP / 2)
            .attr("y", MARGIN_MCP.LEFT / 2)
            .style("text-anchor", "middle")
            .text("Porcentaje (%)");
        
        svg.append("text")
            .attr("x", innerWidth_MCP / 2 + MARGIN_MCP.LEFT)
            .attr("y", innerHeight_MCP + MARGIN_MCP.BOTTOM - 10)
            .style("text-anchor", "middle")
            .text("Métodos (GET, POST, PUT, DELETE)");
        
            

            



        
           

        

            



      
        



        svg.append("line")
            .attr("x1", MARGIN_MCP.LEFT)
            .attr("y1", MARGIN_MCP.TOP)
            .attr("x2", MARGIN_MCP.LEFT)
            .attr("y2", innerHeight_MCP)
            .attr("stroke", "black")
            .attr("stroke-width", 0.3);

        svg.append("line")
            .attr("x1", MARGIN_MCP.LEFT )
            .attr("y1", innerHeight_MCP)
            .attr("x2", innerWidth_MCP+ MARGIN_MCP.LEFT)
            .attr("y2", innerHeight_MCP)
            .attr("stroke", "black")
            .attr("stroke-width", 1.0);    
        
        
        svg.append("line")
                .attr("x1", MARGIN_MCP.LEFT)
                .attr("y1", MARGIN_MCP.TOP)
                .attr("x2", innerWidth_MCP+ MARGIN_MCP.LEFT)
                .attr("y2", MARGIN_MCP.TOP)
                .attr("stroke", "black")
                .attr("stroke-width", 0.5);

            svg.append("line")
                .attr("x1", innerWidth_MCP+ MARGIN_MCP.LEFT)
                .attr("y1", MARGIN_MCP.TOP)
                .attr("x2", innerWidth_MCP+ MARGIN_MCP.LEFT)
                .attr("y2", innerHeight_MCP)
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
