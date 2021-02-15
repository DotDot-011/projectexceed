var all_room = ['room1','room2'];

var room_status = {
    room1: {
        status: 'True',
        total_num: '0',
    },
    room2: {
        status: 'True',
        total_num: '0',
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

setInterval(() => {
    // get_room_detail()

},1000)

