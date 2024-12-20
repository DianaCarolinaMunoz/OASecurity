const MARGIN_ALL = { LEFT: 100, RIGHT: 10, TOP: 20, BOTTOM: 50 };
const WIDTH_ALL = 750 - MARGIN_ALL.LEFT - MARGIN_ALL.RIGHT;
const HEIGHT_ALL = 600 - MARGIN_ALL.TOP - MARGIN_ALL.BOTTOM;
const innerWidth_ALL = WIDTH_ALL - MARGIN_ALL.LEFT - MARGIN_ALL.RIGHT;
const innerHeight_ALL = HEIGHT_ALL - MARGIN_ALL.BOTTOM;




d3.csv("data/tablecommits_methodswithglobalsecurity_5.csv").then(data => {
    
    
    // function formatTimeStamp(timeStamp) {
    //     const date = new Date(timeStamp);
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
    //     return year + "/" + month;
    // }

    

    function formatTimeStamp(timeStamp) {
        const date = new Date(timeStamp);
        const year = date.getFullYear().toString();
        // const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
        return year //+ "/" + month;
    }

    // function formatTimeStamp(timeStamp) {
    //     const date = new Date(timeStamp);
    //     const year = date.getFullYear();
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Asegura dos dígitos
    //     const day = date.getDate().toString().padStart(2, '0');         // Asegura dos dígitos
    //     const hours = date.getHours().toString().padStart(2, '0');      // Hora en formato 24h
    //     const minutes = date.getMinutes().toString().padStart(2, '0');  // Minutos con dos dígitos
    //     const seconds = date.getSeconds().toString().padStart(2, '0');  // Segundos con dos dígitos
    
    //     // Retorna el timestamp completo formateado
    //     return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    // }
    

    data.forEach(d => {
        d.apiSpec_id = +d.apiSpec_id;
        //commits with security definitions checking local and global security
        d.c_local_nolocal_global = parseInt(d.c_local_nolocal_global); 
        d.c_local_nolocal = parseInt(d.c_local_nolocal); 

        d.c_local_global = parseInt(d.c_local_global); 
        d.c_local = parseInt(d.c_local); 
        
        d.c_nolocal_global = parseInt(d.c_nolocal_global); 
        
        d.c_nolocal = parseInt(d.c_nolocal); 

        d.c_global = parseInt(d.c_global); //solo global no paths


        d.coas = parseInt(d.coas); //secnopaths

        // d.c_no_oas = parseInt(d.c_no_oas); //nooas
        // d.c_no_sw = parseInt(d.c_no_sw); //no oas

        d.c_nooas = parseInt(d.c_nooas)



        d.totalcommit_secd = d.c_local_nolocal_global + d.c_local_nolocal + d.c_local_global + d.c_local + d.c_nolocal_global + d.c_nolocal +d.c_global+ d.coas + d.c_nooas 


        
        d.formattedTimeStamp = formatTimeStamp(d.timeStamp);
    });

    
    // const startDate = "2016/01";
    // const endDate = "2022/12";

    const startDate = "2016";
    const endDate = "2021";

    // Ejemplo de filtro por rango de fechas
    // const startDate = new Date("2016-01-01T00:00:00").getTime();
    // const endDate = new Date("2022-12-31T23:59:59").getTime();

    

    const filteredData = data.filter(d => d.formattedTimeStamp >= startDate && d.formattedTimeStamp <= endDate);
    console.log(`Número de registros en filteredData: ${filteredData.length}`);

    // Filtra los datos por el rango de fechas
    // const filteredData = data.filter(d => {
    //     const timeStamp = new Date(d.timeStamp).getTime(); // Convierte el timestamp a milisegundos
    //     return timeStamp >= startDate && timeStamp <= endDate;
    // });




    
       const groupedData = d3.rollup(
        filteredData,
        group => {
       
            const APIsLocalNoLocalGlobal = new Set(
                group.filter(d => d.c_local_nolocal_global > 0).map(d => d.apiSpec_id)
            ).size;

            const uniqueAPIsLocalNoLocalGlobal = new Set(
                group.filter(d => d.c_local_nolocal_global > 0).map(d => d.apiSpec_id)
              );
            
            const apisList_LNLG = Array.from(uniqueAPIsLocalNoLocalGlobal).join(', '); // List
  

    
            const APIsLocalNoLocal = new Set(
                group.filter(d => d.c_local_nolocal > 0).map(d => d.apiSpec_id)
            ).size;


            const uniqueAPIsLocalNoLocal = new Set(
                group.filter(d => d.c_local_nolocal > 0).map(d => d.apiSpec_id)
              );
            
            const apisList_LNL = Array.from(uniqueAPIsLocalNoLocal).join(', '); // List



    
            const APIsLocalGlobal = new Set(
                group.filter(d => d.c_local_global > 0).map(d => d.apiSpec_id)
            ).size;


            const uniqueAPIsLocalGlobal = new Set(
                group.filter(d => d.c_local_global > 0).map(d => d.apiSpec_id)
              );
            
            const apisList_LG = Array.from(uniqueAPIsLocalGlobal).join(', '); // List


    
            const APIsLocal = new Set(
                group.filter(d => d.c_local > 0).map(d => d.apiSpec_id)
            ).size;


            const uniqueAPIsLocal = new Set(
                group.filter(d => d.c_local > 0).map(d => d.apiSpec_id)
              );
            
            const apisList_L = Array.from(uniqueAPIsLocal).join(', '); // List



            const APIsNoLocalGlobal = new Set(
                group.filter(d => d.c_nolocal_global > 0).map(d => d.apiSpec_id)
            ).size;

            const uniqueAPIsNoLocalGlobal= new Set(
                group.filter(d => d.c_nolocal_global > 0).map(d => d.apiSpec_id)
              );
            
            const apisList_NLG = Array.from(uniqueAPIsNoLocalGlobal).join(', '); // List


            const APIsNoLocal = new Set(
                group.filter(d => d.c_nolocal > 0).map(d => d.apiSpec_id)
            ).size;


            const uniqueAPIsNoLocal = new Set(
                group.filter(d => d.c_nolocal > 0).map(d => d.apiSpec_id)
              );
            
            const apisList_NL = Array.from(uniqueAPIsNoLocal).join(', '); // List


            // const commonAPIs = Array.from(uniqueAPIsLocalNoLocal)
            // .filter(api => uniqueAPIsLocalNoLocalGlobal.has(api) && uniqueAPIsLocalNoLocal.has(api) && uniqueAPIsLocalGlobal.has(api) && 
            //                 uniqueAPIsLocal.has(api) && uniqueAPIsNoLocalGlobal.has(api) && uniqueAPIsNoLocal.has(api) 
        
            // );

            const commonAPIs = Array.from(uniqueAPIsLocalNoLocal)
            .filter(api => uniqueAPIsLocalNoLocalGlobal.has(api) && uniqueAPIsNoLocal.has(api) 
                        
        
            );

            // const commonAPIs = Array.from(uniqueAPIsNoLocal)
            // .filter(api => uniqueAPIsNoLocalGlobal.has(api) && uniqueAPIsLocal.has(api) 
        
            // );

            const apisListCommon = commonAPIs.join(', ');

            // console.log(`APIs comunes entre los tres conjuntos: ${apisListCommon}`);
            // console.log(`Número de APIs comunes: ${commonAPIs.length}`);
    
//d.coas + d.c_no_oas + d.c_no_sw;
            

            return {
                totalc_local_global_sum:d3.sum(group, d => d.c_local_global),  
                totalc_local_sum:d3.sum(group, d =>d.c_local),
                totalc_local_nolocal_global_sum:d3.sum(group, d => d.c_local_nolocal_global),
                totalc_nolocal_global_sum:d3.sum(group, d =>d.c_nolocal_global),
                totalc_local_nolocal_sum:d3.sum(group, d =>d.c_local_nolocal),
                totalc_nolocal_sum:d3.sum(group, d =>d.c_nolocal),
                totalc_global_sum:d3.sum(group, d =>d.c_global),
                totalc_coas_sum:d3.sum(group, d =>d.coas),//solo sec comp
                totalc_no_oas_sum:d3.sum(group, d =>d.c_nooas),//nothing
               
                totalcommit_secd_sum:d3.sum(group, d =>d.totalcommit_secd),

                APIsLocalNoLocalGlobal: APIsLocalNoLocalGlobal, 
                APIsLocalNoLocal: APIsLocalNoLocal,  
                APIsLocalGlobal: APIsLocalGlobal,  
                APIsLocal: APIsLocal, 
                APIsNoLocalGlobal: APIsNoLocalGlobal, 
                APIsNoLocal:APIsNoLocal,

                apisList_LNLG:apisList_LNLG,
                apisList_LNL:apisList_LNL,
                apisList_LG:apisList_LG,
                apisList_L:apisList_L,
                apisList_NLG:apisList_NLG,
                apisList_NL:apisList_NL,
                apisListCommon:apisListCommon,

            }
        },
        // d => new Date(d.formattedTimeStamp).getFullYear()  // Agrupar por año
        d => d.formattedTimeStamp
    );

    let total_nooas_acumulado = 0;

    groupedData.forEach(value => {
        total_nooas_acumulado += value.totalc_coas_sum;
    });
    
    // El 'groupedData' ahora tiene los datos agrupados por año con el total de APIs únicas y otras métricas
    
    console.log(`Total acumulado de 'totalc_nooas_sum': ${total_nooas_acumulado}`);



    let aggregatedData = Array.from(groupedData, ([formattedTimeStamp, values]) => ({ formattedTimeStamp, ...values }));

    aggregatedData.sort((a, b) => new Date(a.formattedTimeStamp) - new Date(b.formattedTimeStamp)); // Ordenar por formattedTimeStamp


    // const apisToPlot = [291401];
    // aggregatedData = aggregatedData.filter(d => apisToPlot.includes(d.apiSpec_id));

    // console.log(`Número de registros orginial: ${aggregatedData.length}`);


    const svg = drawConnectedScatterplot(aggregatedData);
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

    function drawConnectedScatterplot(aggregatedData) {

        const svg = d3.select('#date-commits-classification')
            .append("svg")
            .attr("width", WIDTH_ALL)
            .attr("height", HEIGHT_ALL);

        // const svg = d3.create("svg")
        //     .attr("width", WIDTH_ALL)
        //     .attr("height", HEIGHT_ALL)     

       
        // const x = d3.scaleBand()
        //     // .domain(xAxisValues)
        //     .domain(aggregatedData.map(d => d.formattedTimeStamp))
        //     .range([MARGIN_ALL.LEFT , innerWidth_ALL + MARGIN_ALL.LEFT ])
        //     .padding(0.1);
        
        const barWidth = (innerWidth_ALL / aggregatedData.length) * 0.8; // Ancho de las barras, ajustado para tener espacio a ambos lados
        const barPadding = (innerWidth_ALL / aggregatedData.length) * 0.09; // Espacio entre las barras
            
        const x = d3.scaleTime()
            .domain([d3.min(aggregatedData, d => new Date(d.formattedTimeStamp)), d3.max(aggregatedData, d => new Date(endDate))])
            
            // .domain([d3.min(aggregatedData, d => new Date(d.formattedTimeStamp)), new Date(endDate)]) // Ajustar el dominio con el año final
            .range([MARGIN_ALL.LEFT, innerWidth_ALL + MARGIN_ALL.LEFT-90]);

        // const y = d3.scaleLinear()
        //     .domain([0, d3.max(aggregatedData, d => Math.max(d.totalFilteredPathsSum, d.unsecureSum))])
        //     .range([HEIGHT_ALL - MARGIN_ALL.BOTTOM, MARGIN_ALL.TOP]);

        const maxYValue = d3.max(aggregatedData, d => d.totalcommit_secd_sum);
        

        const y = d3.scaleLinear()
            .domain([0, maxYValue])
            .range([HEIGHT_ALL - MARGIN_ALL.BOTTOM, MARGIN_ALL.TOP]);

  


        const color = d3.scaleOrdinal()
            .domain(["c_local_global","c_local", "c_local_nolocal_global","c_nolocal_global","c_local_nolocal","c_nolocal"])
        // .range(["#F8FF00", "#ffff99", "#A7F355", "#ccffcc", "orange", "steelblue"]);
            .range(["#339900", "#ace600", "#ccff33", "#ffff33", "#ffd966", "orange"]); // warning ones




        const tooltip = d3.select("body").append("div")
            .attr("id", "tooltip")
            .style("position", "absolute")
            .style("opacity", 0)  
            .style("background", "yellow")  
            .style("border", "1px solid black")
            .style("padding", "5px")
            .style("border-radius", "3px")
            .style("color", "black") 
            .style("z-index", "9999");

       
        // d.totalcommit_secd = d.c_local_nolocal_global + d.c_local_nolocal + d.c_local_global + d.c_local + d.c_nolocal_global + d.c_nolocal +d.c_global+ d.coas + d.c_no_oas + d.c_no_sw;



        svg.selectAll(".bar1")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar1")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y(d.totalc_local_global_sum + d.totalc_local_sum + d.totalc_local_nolocal_global_sum + d.totalc_nolocal_global_sum + d.totalc_local_nolocal_sum + d.totalc_nolocal_sum +d.totalc_global_sum  + d.totalc_coas_sum+  d.totalc_no_oas_sum  )) //+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_local_global_sum))
            .attr("fill", color("c_local_global"))  
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2)  

            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_local_global_sum} Commits<br>
                        ${d.APIsLocalNoLocalGlobal} APIs <br>
                        ${d.apisList_LNLG}
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });
       
       
       
        svg.selectAll(".bar2")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar2")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y(d.totalc_local_sum + d.totalc_local_nolocal_global_sum + d.totalc_nolocal_global_sum + d.totalc_local_nolocal_sum + d.totalc_nolocal_sum  +d.totalc_global_sum  + d.totalc_coas_sum+  d.totalc_no_oas_sum  ))//+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_local_sum))
            .attr("fill", color("c_local"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2) 
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                       
                        ${d.totalc_local_sum} Commits local<br>
                     
                        
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });      

          
            
        svg.selectAll(".bar3")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar3")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y(d.totalc_local_nolocal_global_sum + d.totalc_nolocal_global_sum + d.totalc_local_nolocal_sum + d.totalc_nolocal_sum +d.totalc_global_sum  + d.totalc_coas_sum+  d.totalc_no_oas_sum  )) //+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_local_nolocal_global_sum))
            .attr("fill", color("c_local_nolocal_global"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2) 
            
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_local_nolocal_global_sum} Commits<br>
                       

                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });      
            
            

        svg.selectAll(".bar4")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar4")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y(d.totalc_nolocal_global_sum + d.totalc_local_nolocal_sum + d.totalc_nolocal_sum +d.totalc_global_sum  + d.totalc_coas_sum+  d.totalc_no_oas_sum   ))//+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_nolocal_global_sum))
            .attr("fill", color("c_nolocal_global"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2) 
            
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_nolocal_global_sum} Commits<br>
                      
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });      

        svg.selectAll(".bar5")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar5")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y(d.totalc_local_nolocal_sum + d.totalc_nolocal_sum +d.totalc_global_sum  + d.totalc_coas_sum+  d.totalc_no_oas_sum )) //+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_local_nolocal_sum))
            .attr("fill", color("c_local_nolocal"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2) 
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_local_nolocal_sum} Commits<br>
                  
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });             


        svg.selectAll(".bar6")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar6")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y(d.totalc_nolocal_sum +d.totalc_global_sum  + d.totalc_coas_sum+  d.totalc_no_oas_sum  ))//+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_nolocal_sum))
            .attr("fill", color("c_nolocal"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2) 
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_nolocal_sum} Commits<br>
                        ${d.APIsNoLocal} APIs <br>
                        ${d.apisList_NL}
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });    
            
            //d.coas + d.c_no_oas + d.c_no_sw;
            //totalc_coas_sum:d3.sum(group, d =>d.coas),//sec
            // totalc_no_oas_sum:d3.sum(group, d =>d.c_no_oas),//nothing
            // totalc_no_sw_sum:d3.sum(group, d =>d.c_no_sw),//nothing

        svg.selectAll(".bar7")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar7")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y( d.totalc_global_sum + d.totalc_coas_sum+  d.totalc_no_oas_sum ))//+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_global_sum))
            .attr("fill", "#3B71CA")
            .attr("stroke", "#3B71CA")      
            .attr("stroke-width", 0.2) 
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_global_sum} Commits solo Global<br>
                      
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });            




        svg.selectAll(".bar8")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar8")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y( d.totalc_coas_sum+  d.totalc_no_oas_sum )) //+ d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y(d.totalc_coas_sum))
            .attr("fill", "blue")
            .attr("stroke", "blue")      
            .attr("stroke-width", 0.2) 
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_coas_sum} Commits<br>
                      
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });            



        svg.selectAll(".bar9")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar9")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)) + barPadding / 2)
            .attr("y", d => y(d.totalc_no_oas_sum )) // + d.totalc_no_sw_sum
            // .attr("width", x.bandwidth() / 2)
            .attr("width", barWidth)
            .attr("height", d => HEIGHT_ALL - MARGIN_ALL.BOTTOM  - y( d.totalc_no_oas_sum )) // + d.totalc_no_sw_sum
            .attr("fill", "red")
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2) 
            .on("mouseover", function(event, d) {
                const barColor = d3.select(this).attr("fill");
                tooltip.style("opacity", 1)  // Cambiado a opacity 1
                    .style("background", barColor)
                    .html(`
                        ${d.totalc_no_oas_sum } Commits<br>
                       
                    `);
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                       .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);  // Cambiado a opacity 0
            });            
    
     
            

        // const xAxisValues = ["2016/01", "2018/01","2020/01","2022/01"];
        const xAxisValues = ["2016", "2017", "2018", "2019","2020","2021","2022"];

        // const xAxisValues = aggregatedData.map(d => new Date(d.formattedTimeStamp)); 
        const selectedXAxisValues = xAxisValues.map(date => new Date(date)); 
        const xAxis = d3.axisBottom(x)
            .tickValues(selectedXAxisValues)
            // .tickFormat(d3.timeFormat("%Y/%m"))
            .tickFormat(d3.timeFormat("%Y"))

            .tickSize(-HEIGHT_ALL + MARGIN_ALL.TOP + MARGIN_ALL.BOTTOM)
            // .tickSize(-innerHeight_ALL)
            // .tickSize(0)
            .tickSizeOuter(0)
            // .tickPadding(10);

        // const xAxis = d3.axisBottom(x)
        //     .tickSize(-HEIGHT_ALL + MARGIN_ALL.TOP + MARGIN_ALL.BOTTOM)
        //     .tickSizeOuter(0)
        //     .tickFormat(d3.timeFormat("%Y"))
        //     .tickFormat((d, i) => {
        //         // Establecer el color de las líneas del eje x
        //         return `<text fill="#ddd">${d}</text>`;
        //     });
        //     //Solo si necesitas mostrar algunos valores específicos en el eje x:
        // const selectedXAxisValues = xAxisValues.map(date => new Date(date)); 
        // xAxis.tickValues(selectedXAxisValues);

        const yAxis = d3.axisLeft(y)    
            // .tickSize(-WIDTH_ALL + MARGIN_ALL.LEFT + MARGIN_ALL.RIGHT)
            .tickSize(-innerWidth_ALL)
            .tickSizeOuter(0)
            // .tickPadding(10);

        

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0, ${HEIGHT_ALL - MARGIN_ALL.BOTTOM})`)
            .call(xAxis)
            .selectAll("line")
                .style("stroke", "#ddd") 
                .style("stroke-width", 0.3) 
                .style("shape-rendering", "crispEdges")
                .style("opacity", 0.5) 
            svg.selectAll(".grid text")
                .attr("dy", "2.35em")
                .attr("x", barWidth/2 ) 
                .style("text-anchor", "middle")
                .style("font-size", "20px") // Tamaño de la fuente para las etiquetas
                .attr("font-family", "Times New Roman");
        
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(${MARGIN_ALL.LEFT},0)`)
            .call(yAxis)
            .selectAll("line")
            .style("stroke", "#ddd") 
            .style("stroke-width", 0.3) 
            .style("shape-rendering", "crispEdges")
            .style("opacity", 0.5) //  
            // .selectAll(".tick line")
            // .style("stroke-width", 0.3) 
            // .style("stroke", "#ddd") 
            svg.selectAll(".grid text")
            .style("font-size", "20px") // Tamaño de la fuente para las etiquetas
            .attr("font-family", "Times New Roman");


        svg.append("text")
            .attr("class", "x-axis-label")
            .attr("x", WIDTH_ALL / 2)
            .attr("y", HEIGHT_ALL - 510)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("font-family", "Times New Roman")
            .text("Yearly Distribution");

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("x", -HEIGHT_ALL / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("font-size", "20px")
            .attr("font-family", "Times New Roman")
            .text("Number of Commits with OAS");

        const legend = svg.append("g")
            .attr("transform", `translate(${WIDTH_ALL - 230}, -1)`);

            // const color = d3.scaleOrdinal()
            // .domain(["c_local_nolocal_global","c_local_nolocal","c_local_global","c_local", "c_nolocal_global", "c_nolocal"])
            // .range(["#F8FF00", "#f8f882", "#A7F355", "lightgreen", "orange", "steelblue"]);

    //     legend.append("rect")
    //     .attr("x", -300)
    //     .attr("y", 0)
    //     .attr("width", 15)
    //     .attr("height", 15)
    //     .attr("fill", color("c_local_global"));        
    // legend.append("text")
    //     .attr("x", -280)
    //     .attr("y", 12)
    //     .text("Local and global security scheme ")
    //     .attr("fill", "black")
    //     .attr("font-size", "30px")
    //     .attr("font-family", "Times New Roman")
    //     .attr("alignment-baseline", "middle");    


    
// legend.append("rect")
//     .attr("x", -300)
//     .attr("y", 20)
//     .attr("width", 15)
//     .attr("height", 15)
//     .attr("fill", color("c_local"));
// legend.append("text")
//     .attr("x", -280)
//     .attr("y", 30)
//     .text("Local security schemes ")
//     .attr("fill", "black")
//     .attr("font-size", "30px")
//     .attr("font-family", "Times New Roman")
//     .attr("alignment-baseline", "middle");    

//     legend.append("rect")
//         .attr("x", -300)
//         .attr("y", 40)
//         .attr("width", 15)
//         .attr("height", 15)
//         .attr("fill", color("c_local_nolocal_global"));
//     legend.append("text")
//         .attr("x", -280)
//         .attr("y", 50)
//         .text("Local, no local and global security schemes ")
//         .attr("fill", "black")
//         .attr("font-size", "30px")
//         .attr("font-family", "Times New Roman")
//         .attr("alignment-baseline", "middle");       


//     legend.append("rect")
//         .attr("x", -300)
//         .attr("y", 60)
//         .attr("width", 15)
//         .attr("height", 15)
//         .attr("fill", color("c_nolocal_global"));
//     legend.append("text")
//         .attr("x", -280)
//         .attr("y", 70)
//         .text("No local but global security schemes")
//         .attr("fill", "black")
//         .attr("font-size", "30px")
//         .attr("font-family", "Times New Roman")
//         .attr("alignment-baseline", "middle");  


//     legend.append("rect")
//         .attr("x", -300)
//         .attr("y", 80)
//         .attr("width", 15)
//         .attr("height", 15)
//         .attr("fill", color("c_local_nolocal"));
//     legend.append("text")
//         .attr("x", -280)
//         .attr("y", 90)
//         .text("Local and no local security schemes")
//         .attr("fill", "black")
//         .attr("font-size", "30px")
//         .attr("font-family", "Times New Roman")
//         .attr("alignment-baseline", "middle");  


//     legend.append("rect")
//         .attr("x", -300)
//         .attr("y", 100)
//         .attr("width", 15)
//         .attr("height", 15)
//         .attr("fill", color("c_nolocal"));
//     legend.append("text")
//         .attr("x", -280)
//         .attr("y", 110)
//         .text("No local security schemes")
//         .attr("fill", "black")
//         .attr("font-size", "30px")
//         .attr("font-family", "Times New Roman")
//         .attr("alignment-baseline", "middle");  






          
            

        svg.append("line")
            .attr("x1", MARGIN_ALL.LEFT)
            .attr("y1", MARGIN_ALL.TOP)
            .attr("x2", MARGIN_ALL.LEFT)
            .attr("y2", innerHeight_ALL)
            .attr("stroke", "black")
            .attr("stroke-width", 0.3);

        svg.append("line")
            .attr("x1", MARGIN_ALL.LEFT )
            .attr("y1", innerHeight_ALL)
            .attr("x2", innerWidth_ALL + MARGIN_ALL.LEFT)
            .attr("y2", innerHeight_ALL)
            .attr("stroke", "black")
            .attr("stroke-width", 1.0);    
        
        
        svg.append("line")
                .attr("x1", MARGIN_ALL.LEFT)
                .attr("y1", MARGIN_ALL.TOP)
                .attr("x2", innerWidth_ALL + MARGIN_ALL.LEFT)
                .attr("y2", MARGIN_ALL.TOP)
                .attr("stroke", "black")
                .attr("stroke-width", 0.5);

        svg.append("line")
                .attr("x1", innerWidth_ALL + MARGIN_ALL.LEFT)
                .attr("y1", MARGIN_ALL.TOP)
                .attr("x2", innerWidth_ALL + MARGIN_ALL.LEFT)
                .attr("y2", innerHeight_ALL)
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
