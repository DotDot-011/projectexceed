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

function fetchJanitors() {
    const janitors = [{
            name: "Pensri",
            start: 9,
            end: 20,
        },
        {
            name: "Siwat",
            start: 9,
            end: 10,
        },
    ];

    janitors.forEach((janitor) => {
        addRow(janitor.name, janitor.start, janitor.end);
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

    const payload = JSON.stringify({ data: janitorData });

    console.log(payload);
}

window.onload = function() {
    fetchJanitors();
};