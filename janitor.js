const route="http://158.108.182.1:3000/";

function addRow(name, start, end) {
    const janitorTable = document.getElementById("janitor-table");
    const newRow = document.createElement("tr");

    addDataToRow(name, newRow);
    addDataToRow(start, newRow);
    addDataToRow(end, newRow);

    janitorTable.append(newRow);
}

function addDataToRow(data, row) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    td.append(input);
    input.value = data;
    row.append(td);
}

function sendfetch(data){
    fetch(route+"janitor/create",{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: data,
    }).then(response => console.log(response));
}

function fetchJanitors() {
    const janitors = [];

    fetch(route+"alljan",
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json()).then((loads) => {
            loads['data'].forEach(load=>{
                janitors.push(load);  
                console.log(janitors);        
            });
        }).then(x => {
            // console.log(janitors);
            janitors.forEach((janitor) => {
                // console.log(janitor.name);
                // console.log(janitor.start);
                // console.log(janitor.end);
                addRow(janitor.name, janitor.start, janitor.end);
            });
        });

}

function add() {
    addRow("", "", "");
}

function updateJanitorData() {
    const rows = Array.from(document.getElementsByTagName("tr"));
    const janitorDataRows = rows.slice(1, rows.length);
    const janitorData = [];

    janitorDataRows.forEach((row) => {
        const tds = Array.from(row.children);
        const name = tds[0].children[0].value;
        const start = tds[1].children[0].value;
        const end = tds[2].children[0].value;

        const janitor = {
            name: name,
            start: start,
            end: end,
        };

        if (name && start && end) janitorData.push(janitor);
    });

    const payload = JSON.stringify({ janitor: "z",data: janitorData });
    sendfetch(payload);
    console.log(payload);
}

window.onload = function() {
    fetchJanitors();
};


// {
//     data: {
//     {"name":"Pensri","start":"9","end":"20"},
//     {"name":"Siwat","start":"9","end":"10"}}
// }
