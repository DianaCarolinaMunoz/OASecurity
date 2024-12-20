// const MARGIN_COASP = { LEFT: 100, RIGHT: 20, TOP: 20, BOTTOM: 70 };
// const WIDTH_COASP = 770 - MARGIN_COASP.LEFT - MARGIN_COASP.RIGHT;
// const HEIGHT_COASP = 300 - MARGIN_COASP.TOP - MARGIN_COASP.BOTTOM;
// const innerWidth_COASP = WIDTH_COASP - MARGIN_COASP.LEFT - MARGIN_COASP.RIGHT;
// const innerHeight_COASP= HEIGHT_COASP - MARGIN_COASP.BOTTOM;



d3.csv("data/tableallapis_githubdb_commitsclasification_sw_oas.csv").then(data => {

    function formatTimeStamp(timeStamp) {
        const date = new Date(timeStamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
        return year + "/" + month;
    }

  

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

        d.c_no_oas = parseInt(d.c_no_oas); //nooas
        d.c_no_sw = parseInt(d.c_no_sw); //no oas

        d.c_nooas = parseInt(d.c_nooas)

        


        d.totalcommit = d.c_local_nolocal_global + d.c_local_nolocal + d.c_local_global + d.c_local + d.c_nolocal_global + d.c_nolocal +  d.c_global + d.coas + d.c_nooas;

        d.formattedTimeStamp = formatTimeStamp(d.timeStamp);
    });


    
    const startDate = "2015/01";
    const endDate = "2022/12"; 


    const filteredData = data.filter(d => d.formattedTimeStamp >= startDate && d.formattedTimeStamp <= endDate);
  
   
   
    const sumData = d3.rollup(filteredData, v => ({

       
        totalc_local_nolocal_global: d3.sum(v, d => d.c_local_nolocal_global),
        totalc_local_nolocal: d3.sum(v, d => d.c_local_nolocal),
        totalc_local_global:d3.sum(v, d => d.c_local_global),
        totalc_local: d3.sum(v, d => d.c_local), 
        totalc_nolocal_global: d3.sum(v, d => d.c_nolocal_global),
        totalc_nolocal: d3.sum(v, d => d.c_nolocal),

        totalc_global: d3.sum(v, d => d.c_global),
        totalc_coas: d3.sum(v, d => d.coas),

        totalc_no_oas: d3.sum(v, d => d.c_nooas),
        // totalc_no_sw: d3.sum(v, d => d.c_no_sw),


        totalc: d3.sum(v, d => d.totalcommit),




    }), d => d.formattedTimeStamp);

    const percentageData = Array.from(sumData, ([key, value]) => ({
        formattedTimeStamp: key,
    
        per_c_local_nolocal_global: value.totalc_local_nolocal_global/ value.totalc,
        per_c_local_nolocal: value.totalc_local_nolocal / value.totalc,
        per_c_local_global: value.totalc_local_global/ value.totalc,
        per_c_local: value.totalc_local / value.totalc,
        per_c_nolocal_global: value.totalc_nolocal_global/ value.totalc,
        per_c_nolocal: value.totalc_nolocal / value.totalc,

        per_c_global: value.totalc_global / value.totalc,
        per_c_coas: value.totalc_coas / value.totalc,

        per_c_no_oas: value.totalc_no_oas / value.totalc,

        // per_c_no_sw: value.totalc_no_sw / value.totalc,

       




    }));
    
    const aggregatedData = percentageData.map(({ formattedTimeStamp, ...values }) => ({ formattedTimeStamp, ...values }));

    aggregatedData.sort((a, b) => new Date(a.formattedTimeStamp) - new Date(b.formattedTimeStamp)); 


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

        const svg = d3.select('#date-commits-classification-per-month')
            .append("svg")
            .attr("width", WIDTH_COASP)
            .attr("height", HEIGHT_COASP);
        // const svg = d3.create("svg")
        //     .attr("width", WIDTH_COASP)
        //     .attr("height", HEIGHT_COASP)     

        // const x = d3.scaleBand()
        //     .domain(aggregatedData.map(d => d.formattedTimeStamp))
        //     .range([MARGIN_COASP.LEFT, innerWidth_COASP + MARGIN_COASP.LEFT])
        //     .padding(0.1);

        const barWidth = (innerWidth_COASP / aggregatedData.length) * 0.8; 
        const barPadding = (innerWidth_COASP / aggregatedData.length) * 0.01; 
           
        const x = d3.scaleTime()
            .domain([d3.min(aggregatedData, d => new Date(d.formattedTimeStamp)), d3.max(aggregatedData, d => new Date(d.formattedTimeStamp))])
            .range([MARGIN_COASP.LEFT, innerWidth_COASP + MARGIN_COASP.LEFT-10]);

        const y = d3.scaleLinear()
            .domain([0, 1]) // El dominio de la escala y es de 0 a 1
            .range([innerHeight_COASP, MARGIN_COASP.TOP]);

        

        // const barWidth = innerWidth_COASP / aggregatedData.length - 2;

        // const color = d3.scaleOrdinal()
        // .domain(["c_local_nolocal_global","c_local_nolocal","c_local_global","c_local", "c_nolocal_global", "c_nolocal"])
        // .range(["#F8FF00", "#f8f882", "#A7F355", "lightgreen", "orange", "steelblue"]);

        const color = d3.scaleOrdinal()
        .domain(["c_local_global","c_local", "c_local_nolocal_global","c_nolocal_global","c_local_nolocal","c_nolocal"])
        .range(["#339900", "#ace600", "#ccff33", "#ffff33", "#ffd966", "orange"]); // warning ones



     
        //localandnoglobal
        svg.selectAll(".bar1")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar1")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)))
            .attr("y", d => y(d.per_c_local_global + d.per_c_local + d.per_c_local_nolocal_global + d.per_c_nolocal_global + d.per_c_local_nolocal + d.per_c_nolocal + d.per_c_global + d.per_c_coas + d.per_c_no_oas  ))
            .attr("width", barWidth)
            .attr("height", d => innerHeight_COASP- y(d.per_c_local_global))
            .attr("fill", color("c_local_global"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.3)   
        
        
        
        //localandglobal
        svg.selectAll(".bar2")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar2")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)))
            .attr("y", d => y(d.per_c_local + d.per_c_local_nolocal_global + d.per_c_nolocal_global + d.per_c_local_nolocal + d.per_c_nolocal + d.per_c_global + d.per_c_coas  + d.per_c_no_oas ))
            .attr("width", barWidth)
            .attr("height", d => innerHeight_COASP- y(d.per_c_local))
            .attr("fill", color("c_local"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.3)  
        
           

        //nolocalandglobal
        svg.selectAll(".bar3")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar3")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)))
            .attr("y", d => y(d.per_c_local_nolocal_global + d.per_c_nolocal_global + d.per_c_local_nolocal + d.per_c_nolocal + d.per_c_global + d.per_c_coas + + d.per_c_no_oas))
            .attr("width", barWidth)
            .attr("height", d => innerHeight_COASP- y(d.per_c_local_nolocal_global))
            .attr("fill", color("c_local_nolocal_global"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.3)     
       
       
        //nolocalnoglobal
        svg.selectAll(".bar4")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar4")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)))
            .attr("y", d => y(d.per_c_nolocal_global + d.per_c_local_nolocal + d.per_c_nolocal + d.per_c_global + d.per_c_coas + d.per_c_no_oas))
            .attr("width", barWidth)
            .attr("height", d => innerHeight_COASP- y(d.per_c_nolocal_global))
            .attr("fill", color("c_nolocal_global"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.3)  


            //nolocalnoglobal
        svg.selectAll(".bar5")
        .data(aggregatedData)
        .enter().append("rect")
        .attr("class", "bar5")
        // .attr("x", d => x(d.formattedTimeStamp))
        .attr("x", d => x(new Date(d.formattedTimeStamp)))
        .attr("y", d => y(d.per_c_local_nolocal + d.per_c_nolocal + d.per_c_global + d.per_c_coas + d.per_c_no_oas ))
        .attr("width", barWidth)
        .attr("height", d => innerHeight_COASP- y(d.per_c_local_nolocal))
        .attr("fill", color("c_local_nolocal"))
        .attr("stroke", "white")      
        .attr("stroke-width", 0.3)  


        //nolocalnoglobal
        svg.selectAll(".bar6")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar6")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)))
            .attr("y", d => y(d.per_c_nolocal + d.per_c_global + d.per_c_coas  +d.per_c_no_oas))
            .attr("width", barWidth)
            .attr("height", d => innerHeight_COASP- y(d.per_c_nolocal))
            .attr("fill", color("c_nolocal"))
            .attr("stroke", "white")      
            .attr("stroke-width", 0.3)  

         
    

          //globlac
        svg.selectAll(".bar7")
        .data(aggregatedData)
        .enter().append("rect")
        .attr("class", "bar7")
        // .attr("x", d => x(d.formattedTimeStamp))
        .attr("x", d => x(new Date(d.formattedTimeStamp)))
        .attr("y", d => y( d.per_c_global + d.per_c_coas +d.per_c_no_oas))
        .attr("width", barWidth)
        .attr("height", d => innerHeight_COASP- y(d.per_c_global))
        .attr("fill", "#3B71CA")
        .attr("stroke", "#3B71CA")      
        .attr("stroke-width", 0.2)  


        svg.selectAll(".bar8")
        .data(aggregatedData)
        .enter().append("rect")
        .attr("class", "bar8")
        // .attr("x", d => x(d.formattedTimeStamp))
        .attr("x", d => x(new Date(d.formattedTimeStamp)))
        .attr("y", d => y(d.per_c_coas +d.per_c_no_oas))
        .attr("width", barWidth)
        .attr("height", d => innerHeight_COASP- y(d.per_c_coas))
        .attr("fill", "blue")
        .attr("stroke", "blue")      
        .attr("stroke-width", 0.2)  

        svg.selectAll(".bar9")
            .data(aggregatedData)
            .enter().append("rect")
            .attr("class", "bar9")
            // .attr("x", d => x(d.formattedTimeStamp))
            .attr("x", d => x(new Date(d.formattedTimeStamp)))
            .attr("y", d => y(d.per_c_no_oas))
            .attr("width", barWidth)
            .attr("height", d => innerHeight_COASP- y(d.per_c_no_oas))
            .attr("fill", "red")
            .attr("stroke", "white")      
            .attr("stroke-width", 0.2)  






           



        const xAxisValues = ["2016/01", "2018/01","2020/01","2022/01"];
        // const selectedXAxisValues = xAxisValues.map(date => new Date(date)); 
        // const xAxis = d3.axisBottom(x)
        //     .tickValues(selectedXAxisValues)
        //     .tickFormat(d3.timeFormat("%Y/%m"))
        //     .tickSize(-HEIGHT_COASP+ MARGIN_COASP.TOP + MARGIN_COASP.BOTTOM)
        //     // .tickSize(-innerHeight_MTH)
        //     // .tickSize(0)
        //     .tickSizeOuter(0)
        //     .tickPadding(10);

        // const xAxisValues = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
        const selectedXAxisValues = xAxisValues.map(date => new Date(date)); 
        const xAxis = d3.axisBottom(x)
            .tickValues(selectedXAxisValues)
            .tickSize(-HEIGHT_COASP + MARGIN_COASP.TOP + MARGIN_COASP.BOTTOM)
            .tickSizeOuter(0)
            .tickFormat(d3.timeFormat("%Y/%m"))

        // const xAxis = d3.axisBottom(x)
        //     .tickSize(-HEIGHT_COASP + MARGIN_COASP.TOP + MARGIN_COASP.BOTTOM)
        //     .tickSizeOuter(0)
        //     .tickFormat(d3.timeFormat("%Y"));
        // // Solo si necesitas mostrar algunos valores específicos en el eje x:
        // const xAxisValues = ["2015","2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
        // const selectedXAxisValues = xAxisValues.map(date => new Date(date)); 
        // xAxis.tickValues(selectedXAxisValues);


        const yAxis = d3.axisLeft(y)
            .tickValues([0, 0.2, 0.4, 0.6, 0.8, 1]) 
            .tickSize(-WIDTH_COASP + MARGIN_COASP.LEFT + MARGIN_COASP.RIGHT)
            .tickSizeOuter(0)
            // .tickPadding(10);


        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0, ${HEIGHT_COASP - MARGIN_COASP.BOTTOM})`)
            .call(xAxis)
            .selectAll("line")
                .style("stroke", "#ddd") // Color de las líneas de la cuadrícula
                .style("stroke-width", 0.3) // Grosor de las líneas de la cuadrícula
                .style("shape-rendering", "crispEdges")
                .style("opacity", 0.5); // Opacidad de las líneas de la cuadrícula
                svg.selectAll(".grid text")
                    .attr("dy", "2.35em")
                    .attr("x", barWidth/2 ) // Posición centrada sobre cada barra
                    .style("text-anchor", "middle")
                    .style("font-size", "20px")
                    .attr("font-family", "Times New Roman");
    

        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(${MARGIN_COASP.LEFT},0)`)
            .call(yAxis)
            .selectAll("line")
            .style("stroke", "#ddd") 
            .style("stroke-width", 0.3) 
            .style("shape-rendering", "crispEdges")
            .style("opacity", 0.5); //
            svg.selectAll(".grid text")
            .style("font-size", "20px")
            .attr("font-family", "Times New Roman");

    

        // svg.append("text")
        //     .attr("class", "x-axis-label")
        //     .attr("x", WIDTH_COASP / 2)
        //     .attr("y", HEIGHT_COASP -2)
        //     .attr("text-anchor", "middle")
        //     .attr("font-size", "20px")
        //     .attr("font-family", "Times New Roman")  
        //     .text("Usage Frequency")
        //     .text("Monthly Distribution");

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("x", -HEIGHT_COASP / 2)
            .attr("y", 30)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("font-size", "20px")  
            .attr("font-family", "Times New Roman") 
            .text("Proportion"); 


        svg.append("line")
            .attr("x1", MARGIN_COASP.LEFT)
            .attr("y1", MARGIN_COASP.TOP)
            .attr("x2", MARGIN_COASP.LEFT)
            .attr("y2", innerHeight_COASP)
            .attr("stroke", "black")
            .attr("stroke-width", 0.3);

        svg.append("line")
            .attr("x1", MARGIN_COASP.LEFT )
            .attr("y1", innerHeight_COASP)
            .attr("x2", innerWidth_COASP + MARGIN_COASP.LEFT + 1)
            .attr("y2", innerHeight_COASP)
            .attr("stroke", "black")
            .attr("stroke-width", 1.0);    
            
        
        svg.append("line")
            .attr("x1", MARGIN_COASP.LEFT)
            .attr("y1", MARGIN_COASP.TOP)
            .attr("x2", innerWidth_COASP + MARGIN_COASP.LEFT)
            .attr("y2", MARGIN_COASP.TOP)
            .attr("stroke", "black")
            .attr("stroke-width", 0.5);

        svg.append("line")
            .attr("x1", innerWidth_COASP + MARGIN_COASP.LEFT)
            .attr("y1", MARGIN_COASP.TOP)
            .attr("x2", innerWidth_COASP + MARGIN_COASP.LEFT)
            .attr("y2", innerHeight_COASP)
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
