//getting names of players
let playernames = decodeURIComponent(location.search);
playernames = playernames.slice(1);
let players = playernames.split("&");
let playersF: string[] = [];
players.forEach((val, i) => {
  if (i < 9) {
    playersF.push(val.slice(6));
  } else {
    playersF.push(val.slice(7));
  }
});

//for creating info of scores
let createInfo = (team_id: number, score_id: string, hit_id: string) => {
  let p = <HTMLParagraphElement>document.createElement("p");
  p.setAttribute("class", "h4");
  p.innerText = `TEAM ${team_id} SCORE`;
  let p1 = <HTMLParagraphElement>document.createElement("p");
  p1.setAttribute("class", `h5 ${score_id}`);
  p1.innerText = "0";
  let button = <HTMLButtonElement>document.createElement("button");
  button.setAttribute("class", `btn btn-primary sticky-top ${hit_id}`);
  let button_div = <HTMLDivElement>document.createElement("div");
  button_div.setAttribute("class", "d-flex justify-content-center");
  button.innerText = `HIT 0`;
  button_div.append(button);
  return [p, p1, button_div];
};

//for header in table
let createHeader = (scope: string, text: string) => {
  let th = <HTMLTableHeaderCellElement>document.createElement("th");
  th.setAttribute("scope", scope);
  th.innerText = text;
  return th;
};

//for creating body
let createBody = (i: string, id: [number], total: string) => {
  let th = <HTMLTableHeaderCellElement>document.createElement("th");
  th.scope = "row";
  th.innerText = i;
  let arr = [];
  arr.push(th);
  for (let j = 0; j < 6; j++) {
    let td = <HTMLTableDataCellElement>document.createElement("td");
    td.id = `ball${id[0]}`;
    arr.push(td);
    id[0] = id[0] + 1;
  }
  let td = <HTMLTableDataCellElement>document.createElement("td");
  td.id = total;
  arr.push(td);
  return arr;
};

//for creating Table
let createTable = (head: string, names: string[]) => {
  let id: [number] = [0];
  let teamno: number;
  if (head === "TEAM1") {
    id = [1];
    teamno = 1;
  } else {
    id = [61];
    teamno = 2;
  }
  let table = <HTMLTableElement>document.createElement("table");
  table.setAttribute("class", "table table-dark");
  let thead = <HTMLTableSectionElement>document.createElement("thead");
  let tr1 = <HTMLTableRowElement>document.createElement("tr");
  let th1 = createHeader("col", head);
  tr1.append(th1);
  for (let i = 1; i < 7; i++) {
    let th1 = createHeader("col", `B${i}`);
    tr1.append(th1);
  }
  let th2 = createHeader("col", "TOTAL");
  tr1.append(th2);
  thead.append(tr1);
  let tbody = <HTMLTableSectionElement>document.createElement("tbody");
  for (let i = 0; i < 10; i++) {
    let tr1 = <HTMLTableRowElement>document.createElement("tr");
    let td1 = createBody(names[i], id, `team${teamno}_total${i + 1}`);
    tr1.append(...td1);
    tbody.append(tr1);
  }
  table.append(thead, tbody);
  return table;
};

//structuring html elements
let whole = <HTMLDivElement>document.createElement("div");
whole.setAttribute("class", "container");
let row = <HTMLDivElement>document.createElement("div");
row.setAttribute("class", "row align-items-center bg-warning");
let heads = <HTMLDivElement>document.createElement("div");
heads.setAttribute(
  "class",
  "col-12 text-white bg-dark border-bottom border-danger"
);
let header = <HTMLParagraphElement>document.createElement("p");
header.setAttribute("class", "text-center display-4");
header.innerText = "CRICKET 10";
heads.append(header);

let team1_info = <HTMLDivElement>document.createElement("div");
team1_info.setAttribute(
  "class",
  "col-lg-5 p-3 mx-0 bg-warning text-dark text-center"
);
let a1 = createInfo(1, "score_one", "hit_one");
team1_info.append(...a1);
let timer_info = <HTMLDivElement>document.createElement("div");
timer_info.setAttribute(
  "class",
  "col-lg-2 p-3 mx-0 bg-warning my-0 text-dark text-center"
);
let p1 = <HTMLParagraphElement>document.createElement("p");
p1.setAttribute("class", "h4");
p1.innerText = "TIMER";
let timer = <HTMLParagraphElement>document.createElement("p");
timer.setAttribute("class", "h3 timer");
timer.innerText = "60";
timer_info.append(p1, timer);
let team2_info = <HTMLDivElement>document.createElement("div");
team2_info.setAttribute(
  "class",
  "col-lg-5 mx-0 p-3 bg-warning text-dark text-center"
);
let b1 = createInfo(2, "score_two", "hit_two");
team2_info.append(...b1);

let generate_div = <HTMLDivElement>document.createElement("div");
generate_div.setAttribute(
  "class",
  "col-12 d-flex justify-content-center align-items-center p-4"
);
let generate_button = <HTMLButtonElement>document.createElement("button");
generate_button.setAttribute("class", "btn btn-primary btn-lg");
generate_button.id = "generate";
generate_button.disabled = true;
generate_button.innerText = "GENERATE RESULT";
generate_div.append(generate_button);

let team1_scoreboard = <HTMLDivElement>document.createElement("div");
team1_scoreboard.setAttribute(
  "class",
  "col-xl-6 mx-0 p-3 bg-warning text-dark text-center"
);
team1_scoreboard.id = "scoreboard_1";
let scoreboard_head1 = <HTMLParagraphElement>document.createElement("p");
scoreboard_head1.setAttribute("class", "h4");
scoreboard_head1.innerText = "TEAM 1 SCORE BOARD";
team1_scoreboard.append(scoreboard_head1);
let tab = createTable("TEAM1", playersF.slice(0, 10));
team1_scoreboard.append(tab);
let team2_scoreboard = <HTMLDivElement>document.createElement("div");
team2_scoreboard.setAttribute(
  "class",
  "col-xl-6 mx-0 p-3 bg-warning text-dark text-center"
);
team2_scoreboard.id = "scoreboard_2";
let scoreboard_head2 = <HTMLParagraphElement>document.createElement("p");
scoreboard_head2.setAttribute("class", "h4");
scoreboard_head2.innerText = "TEAM 2 SCORE BOARD";
team2_scoreboard.append(scoreboard_head2);
let tab1 = createTable("TEAM2", playersF.slice(10));
team2_scoreboard.append(tab1);

row.append(
  heads,
  team1_info,
  timer_info,
  team2_info,
  generate_div,
  team1_scoreboard,
  team2_scoreboard
);
whole.append(row);
document.body.append(whole);
