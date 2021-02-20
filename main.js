let all_room = ["room1"];

let route = "http://158.108.182.1:2255/";

let room_status = {
    room1: {
        mode: 1,
        name: "Room 1",
        status: "True",
        total_num: "0",
        real_time_num: "15",
        responsible: "None",
    },
    room2: {
        mode: 1,
        name: "room2",
        status: "True",
        total_num: "0",
        responsible: "None",
    },
};

let data_graph = {
    room1: [
        { x: 9, y: 5 },
        { x: 11, y: 3 },
        { x: 13, y: 4 },
        { x: 15, y: 3 },
        { x: 17, y: 6 },
        { x: 19, y: 5 },
        { x: 21, y: 2 },
    ],
};

let temp = {
    room1: {
        time_9: 9,
        time_11: 10,
        time_13: 13,
        time_15: 15,
        time_17: 17,
        time_19: 19,
        time_21: 20,
    },
};

let chart = {
    room1: "",
};

function easy_up(x) {
    Object.keys(temp).forEach((room) => {
        // console.log(temp[room]);
        let i = 0;
        Object.keys(temp[room]).forEach((time) => {
            data_graph[room][i]["y"] = temp[room][time] + x;
            // console.log(time);
            i += 1;
        });
    });
}

function sendNoti(room) {
    fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ janitor: room_status[room]["responsible"] }),
    }).then((response) => {
        console.log(response);
    });
}

function get_room_detail() {
    fetch(route + "room/status", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => response.json())
        .then((datas) => {
            Object.keys(datas).forEach((data) => {
                room_status["room1"][data] = datas[data];
            });
        });
}

// function get_room_graph() {
//     fetch(route+"grap", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },

//     }).then((response) => response.json())
//     .then((datas) => {
//         Object.keys(datas).forEach((room) => {
//             let i = 0;
//             Object.keys(datas[room]).forEach((time) =>{
//                 console.log(data_graph[room]);
//                 data_graph[room][i]['y'] = parseInt(datas[room][time]);
//                 i+=1;
//             })
//         });
//     });
// }

function give_input(x) {
    fetch(route + "addfrq", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frequent: parseInt(x) }),
    }).then((response) => console.log(response)).then(jj=>{console.log("success");});
}

function update_roomstatus() {
    all_room.forEach((room) => {
        let room_name = room + "_number";
        let desti = document.getElementById(room_name);
        desti.innerText = room_status[room]["name"];

        let room_use = room + "_used";
        // console.log(room_use);
        desti = document.getElementById(room_use);
        if (room_status[room]["mode"] == 1) {
            desti.innerText = room_status[room]["total_num"];
        } else {
            desti.innerText = room_status[room]["real_time_num"];
        }

        if (room_status[room]["status"] === "True") {
            desti.style.background =
                "linear-gradient(to bottom left, #184d47, #96bb7c)";
        } else {
            desti.style.background =
                "linear-gradient(to bottom left, #df7861, #ecb390)";
        }
        let room_responsible = room + "_responsible";
        desti = document.getElementById(room_responsible);
        desti.innerText = room_status[room]["responsible"];
    });
}

// function create_graph(room){
//     chart[room] = new CanvasJS.Chart(room+'_chart', {
//         backgroundColor:"transparent",
//         animationEnabled: true,
//         animationDuration:1000,
//         title:{
//             text: "Average Cleaning",
//             fontSize: 25,
//             fontColor: "Crimson",
//         },
//         axisX: {
//             title: "Time",
//             titleFontColor:"#8B0000",
//             titleFontSize:18,
//             labelFontColor:"Crimson",
//             labelFontSize: 15,
//         },
//         axisY: {
//             title: "cleaning round",
//             titleFontColor:"#8B0000" ,
//             titleFontSize:18,
//             labelFontColor:"Crimson",
//             labelFontSize: 15,
//         },
//         data: [{
//             type:"spline",
//             lineThickness: 5,
//             lineColor: "crimson",
//             markerColor: "purple",
//             fillOpacity: .3,
//             indexLabelFontSize: 16,
//             dataPoints: data_graph[room],

//         }]
//     });
//     chart[room].render();
// }

function toJanitor() {
    window.location = "./janitor.html";
}

function toGraph() {
    window.location = "./graph.html";
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (event) => {
    const frequency = document.getElementById("frequency");
    event.preventDefault();

    let frequencyValue = frequency.value;
    if (frequencyValue == "" || frequencyValue == null) {
        alert("Please input a number");
        return;
    }
    
    // console.log(frequencyValue);
    give_input(frequencyValue);
});

console.log(data_graph);

function test(room) {
    room_status[room]["mode"] *= -1;
}

// //สร้างกราฟ
// all_room.forEach((room) => {
//     create_graph(room);
// });

setInterval(() => {
    get_room_detail();
    // give_input();
    //get_room_graph();
    // all_room.forEach((room) => {
    //     create_graph(room);
    // });

    //update graph
    // all_room.forEach((room) => {
    //     for(let j = 0;j< 7;j++)
    //     {
    //         chart[room].options.data[0].dataPoints[j].y = data_graph[room][j]['y'];
    //     }
    //     chart[room].render();
    // });
    update_roomstatus();
}, 1000);