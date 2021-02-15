var all_room = ['room1'];

var room_status = {
    room1: {
        name: 'room1',
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


const form = document.getElementById('input');
form.addEventListener("submit", (event) => {
        event.preventDefault();
        var x = form.elements["frequency"].value;
        console.log(x);
        // give_input(x);
});

setInterval(() => {
    // get_room_detail();
    // give_input();
    update_roomstatus();
},1000);

