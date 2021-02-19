var all_room=["room1",];

var chart={
    room1:"",
};

var data_graph={
    room1:[
        {x: 9,y: 0},
        {x: 11,y: 0},
        {x: 13,y: 0},
        {x: 15,y: 0},
        {x: 17,y: 0},
        {x: 19,y: 0},
        {x: 21,y: 0},
    ],
};

var route="http://158.108.182.1:2255/";

function get_room_graph() {
    fetch(route, {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    }).then((response) => response.json())
    .then((datas) => {
        var i = 0;
        Object.keys(datas).forEach((time) => {
                data_graph['room1'][i]['y'] = int(datas[time]);
                i+=1;
            });
        });
}

function create_graph(room){
    chart[room] = new CanvasJS.Chart('chart_'+room, {
        // backgroundColor:"transparent",
        animationEnabled: true,
        animationDuration:1000,
        title:{
            text: "Average Cleaning",
            fontSize: 25,
            fontColor: "Crimson",
        },
        axisX: {
            title: "Time",
            titleFontColor:"#8B0000",
            titleFontSize:18,
            labelFontColor:"Crimson",
            labelFontSize: 15, 
        },
        axisY: {
            title: "cleaning round",
            titleFontColor:"#8B0000" ,
            titleFontSize:18,
            labelFontColor:"Crimson",
            labelFontSize: 15, 
        },
        data: [{    
            type:"spline",
            lineThickness: 5,
            lineColor: "crimson",
            markerColor: "purple",
            fillOpacity: .3, 
            indexLabelFontSize: 16,
            dataPoints: data_graph[room],
        
        }]
    });
    chart[room].render();
}

//สร้างกราฟ
all_room.forEach((room) => {
    create_graph(room);
});

setInterval(()=>{

    // get_room_graph();

    all_room.forEach((room) => {
        for(var j = 0;j< 7;j++)
        {
            chart[room].options.data[0].dataPoints[j].y = data_graph[room][j]['y'];
        }
        chart[room].render();
    });

},1000);