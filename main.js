var all_room = ['room1'];

var room_status = {
    room1: {
        name: 'Room 1',
        status: 'True',
        total_num: '0',
        responsible: 'None',
    },
    room2: {
        name: 'room2',
        status: 'True',
        total_num: '0',
        responsible: 'None',
    }
};

var data_graph = {
    room1: [
        {x : 9, y: 0},
        {x : 11, y: 0},
        {x : 13, y: 0},
        {x : 15, y: 0},
        {x : 17, y: 0},
        {x : 19, y: 0},
        {x : 21, y: 0},
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
        desti.innerText = room_status[room]['total_num'];
        if(room_status[room]['status'] === 'True')
        {
            desti.style.backgroundColor = 'hsl(101, 61%, 50%)';
        }
        else
        {
            desti.style.backgroundColor = 'red';
        }
        var room_responsible = room+'_responsible';
        desti = document.getElementById(room_responsible);
        desti.innerText = room_status[room]['responsible'];
    })
}

function create_graph(room){
    chart[room] = new CanvasJS.Chart(room+'_chart', {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "average cleaning"
        },
        axisX: {
            title: "Time",
        },
        axisY: {
            title: "cleaning round",
        },
        data: [{        
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: data_graph[room]
        }]
    });
    chart[room].render();
}


const form = document.getElementById('input');
form.addEventListener("submit", (event) => {
        event.preventDefault();
        var x = form.elements["frequency"].value;
        console.log(x);
        // give_input(x);
});

console.log(data_graph);

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
    all_room.forEach((room) => {
        for(var j = 0;j< 7;j++)
        {
            chart[room].options.data[0].dataPoints[j].y = data_graph[room][j]['y'];
        }
        chart[room].render();
    });
    update_roomstatus();
},1000);

