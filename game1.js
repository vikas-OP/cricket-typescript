//getting names of players
var playernames = decodeURIComponent(location.search);
playernames = playernames.slice(1);
var players = playernames.split("&");
var playersF = [];
players.forEach(function (val, i) {
    if (i < 9) {
        playersF.push(val.slice(6));
    }
    else {
        playersF.push(val.slice(7));
    }
});
//for creating info of scores
var createInfo = function (team_id, score_id, hit_id) {
    var p = document.createElement("p");
    p.setAttribute("class", "h4");
    p.innerText = "TEAM " + team_id + " SCORE";
    var p1 = document.createElement("p");
    p1.setAttribute("class", "h5 " + score_id);
    p1.innerText = "0";
    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary sticky-top " + hit_id);
    var button_div = document.createElement("div");
    button_div.setAttribute("class", "d-flex justify-content-center");
    button.innerText = "HIT 0";
    button_div.append(button);
    return [p, p1, button_div];
};
//for header in table
var createHeader = function (scope, text) {
    var th = document.createElement("th");
    th.setAttribute("scope", scope);
    th.innerText = text;
    return th;
};
//for creating body
var createBody = function (i, id, total) {
    var th = document.createElement("th");
    th.scope = "row";
    th.innerText = i;
    var arr = [];
    arr.push(th);
    for (var j = 0; j < 6; j++) {
        var td_1 = document.createElement("td");
        td_1.id = "ball" + id[0];
        arr.push(td_1);
        id[0] = id[0] + 1;
    }
    var td = document.createElement("td");
    td.id = total;
    arr.push(td);
    return arr;
};
//for creating Table
var createTable = function (head, names) {
    var id = [0];
    var teamno;
    if (head === "TEAM1") {
        id = [1];
        teamno = 1;
    }
    else {
        id = [61];
        teamno = 2;
    }
    var table = document.createElement("table");
    table.setAttribute("class", "table table-dark");
    var thead = document.createElement("thead");
    var tr1 = document.createElement("tr");
    var th1 = createHeader("col", head);
    tr1.append(th1);
    for (var i = 1; i < 7; i++) {
        var th1_1 = createHeader("col", "B" + i);
        tr1.append(th1_1);
    }
    var th2 = createHeader("col", "TOTAL");
    tr1.append(th2);
    thead.append(tr1);
    var tbody = document.createElement("tbody");
    for (var i = 0; i < 10; i++) {
        var tr1_1 = document.createElement("tr");
        var td1 = createBody(names[i], id, "team" + teamno + "_total" + (i + 1));
        tr1_1.append.apply(tr1_1, td1);
        tbody.append(tr1_1);
    }
    table.append(thead, tbody);
    return table;
};
//structuring html elements
var whole = document.createElement("div");
whole.setAttribute("class", "container");
var row = document.createElement("div");
row.setAttribute("class", "row align-items-center bg-warning");
var heads = document.createElement("div");
heads.setAttribute("class", "col-12 text-white bg-dark border-bottom border-danger");
var header = document.createElement("p");
header.setAttribute("class", "text-center display-4");
header.innerText = "CRICKET 10";
heads.append(header);
var team1_info = document.createElement("div");
team1_info.setAttribute("class", "col-lg-5 p-3 mx-0 bg-warning text-dark text-center");
var a1 = createInfo(1, "score_one", "hit_one");
team1_info.append.apply(team1_info, a1);
var timer_info = document.createElement("div");
timer_info.setAttribute("class", "col-lg-2 p-3 mx-0 bg-warning my-0 text-dark text-center");
var p1 = document.createElement("p");
p1.setAttribute("class", "h4");
p1.innerText = "TIMER";
var timer = document.createElement("p");
timer.setAttribute("class", "h3 timer");
timer.innerText = "60";
timer_info.append(p1, timer);
var team2_info = document.createElement("div");
team2_info.setAttribute("class", "col-lg-5 mx-0 p-3 bg-warning text-dark text-center");
var b1 = createInfo(2, "score_two", "hit_two");
team2_info.append.apply(team2_info, b1);
var generate_div = document.createElement("div");
generate_div.setAttribute("class", "col-12 d-flex justify-content-center align-items-center p-4");
var generate_button = document.createElement("button");
generate_button.setAttribute("class", "btn btn-primary btn-lg");
generate_button.id = "generate";
generate_button.disabled = true;
generate_button.innerText = "GENERATE RESULT";
generate_div.append(generate_button);
var team1_scoreboard = document.createElement("div");
team1_scoreboard.setAttribute("class", "col-xl-6 mx-0 p-3 bg-warning text-dark text-center");
team1_scoreboard.id = "scoreboard_1";
var scoreboard_head1 = document.createElement("p");
scoreboard_head1.setAttribute("class", "h4");
scoreboard_head1.innerText = "TEAM 1 SCORE BOARD";
team1_scoreboard.append(scoreboard_head1);
var tab = createTable("TEAM1", playersF.slice(0, 10));
team1_scoreboard.append(tab);
var team2_scoreboard = document.createElement("div");
team2_scoreboard.setAttribute("class", "col-xl-6 mx-0 p-3 bg-warning text-dark text-center");
team2_scoreboard.id = "scoreboard_2";
var scoreboard_head2 = document.createElement("p");
scoreboard_head2.setAttribute("class", "h4");
scoreboard_head2.innerText = "TEAM 2 SCORE BOARD";
team2_scoreboard.append(scoreboard_head2);
var tab1 = createTable("TEAM2", playersF.slice(10));
team2_scoreboard.append(tab1);
row.append(heads, team1_info, timer_info, team2_info, generate_div, team1_scoreboard, team2_scoreboard);
whole.append(row);
document.body.append(whole);
