var all_room = ['room1'];

var room_status = {
    room1: {
        mode : 1,
        name: 'Room 1',
        status: 'True',
        total_num: '0',
        real_time_num: '15',
        responsible: 'None',
    },
    room2: {
        mode : 1,
        name: 'room2',
        status: 'True',
        total_num: '0',
        responsible: 'None',
    }
};

var data_graph = {
    room1: [
        {x : 9, y: 5},
        {x : 11, y: 3},
        {x : 13, y: 4},
        {x : 15, y: 3},
        {x : 17, y: 6},
        {x : 19, y: 5},
        {x : 21, y: 2},
    ],
}

var temp = {
    room1: {
        time_9 : 9,
        time_11 : 10,
        time_13 : 13,
        time_15 : 15,
        time_17 : 17,
        time_19 : 19,
        time_21 : 20,
    }
};

var chart = {
    room1 : "",
};

function easy_up(x)
{
    Object.keys(temp).forEach((room) => {
        // console.log(temp[room]);
        var i = 0;
        Object.keys(temp[room]).forEach((time) => {
            data_graph[room][i]['y'] = temp[room][time]+x;
            // console.log(time);
            i+=1;
        });
    });
}

function sendNoti(room){
    fetch("",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ janitor: room_status[room]["responsible"]})
    }).then(response => {console.log(response)});
}

function get_room_detail() {
    fetch("https://exceed1.cpsk-club.xyz", {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    }).then((response) => response.json())
    .then((datas) => {
        Object.keys(datas).forEach((data) => {
            Object.keys(datas[data]).forEach((detail) =>
            {
                room_status[data][detail] = datas[data][detail];
            });
        });
    });
}

function get_room_graph() {
    fetch("https://exceed1.cpsk-club.xyz", {
        method: "GET",
        headers: { "Content-Type": "application/json" },

    }).then((response) => response.json())
    .then((datas) => {
        Object.keys(datas).forEach((room) => {
            data_graph[room] = [];
            var i = 0;
            Object.keys(datas[room]).forEach((time) =>{
                data_graph[room][i]['y'] = datas[room][time];
                i+=1;
            })
        });
    });
}

function give_input(x){
    fetch('https://exceed1.cpsk-club.xyz',{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frequency: x}),
    }).then((response) => console.log(response));
}

function update_roomstatus()
{
    all_room.forEach((room) => {
        var room_name = room+'_number';
        var desti = document.getElementById(room_name);
        desti.innerText = room_status[room]['name'];

        var room_use = room+'_used';
        // console.log(room_use);
        desti = document.getElementById(room_use);
        if (room_status[room]['mode'] == 1)
        {
            desti.innerText = room_status[room]['total_num'];
        }
        else
        {
            desti.innerText = room_status[room]['real_time_num'];
        }
        
        if(room_status[room]['status'] === 'True')
        {
            desti.style.background = "linear-gradient(to bottom left, #13f513, #f9d423)";
        }
        else
        {
            desti.style.backgroundColor = 'linear-gradient(to bottom left, #e9240a, #f9d423)';
        }
        var room_responsible = room+'_responsible';
        desti = document.getElementById(room_responsible);
        desti.innerText = room_status[room]['responsible'];
    })
}



function create_graph(room){
    chart[room] = new CanvasJS.Chart(room+'_chart', {
        backgroundColor:"transparent",
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

function toJanitor(){
    window.location = "./janitor.html";
}

function toGraph(){
    window.location = "./graph.html";
}

const form = document.getElementById('input');
form.addEventListener("submit", (event) => {
        event.preventDefault();
        var x = form.elements["frequency"].value;
        console.log(x);
        // give_input(x);
});

console.log(data_graph);

function test(room) {
    room_status[room]['mode']*=-1;
}

//สร้างกราฟ
all_room.forEach((room) => {
     create_graph(room);
});

setInterval(() => {
    // get_room_detail();
    // give_input();
    // get_room_graph();
    // all_room.forEach((room) => {
    //     create_graph(room);
    // });
    
    //update graph
    all_room.forEach((room) => {
        for(var j = 0;j< 7;j++)
        {
            chart[room].options.data[0].dataPoints[j].y = data_graph[room][j]['y'];
        }
        chart[room].render();
    });
    update_roomstatus();
},1000);

