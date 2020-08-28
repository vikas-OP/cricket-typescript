//for passing names to other page
var query = "";
//creating each input
var createInput = function (text, id) {
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = text;
    input.required = true;
    input.setAttribute("class", "form-control " + id + " text-dark");
    div.append(input);
    return div;
};
//creating form function
var createForm = function (id) {
    var form = document.createElement("form");
    form.id = id;
    form.innerHTML = "";
    for (var i = 0; i < 10; i++) {
        form.append(createInput("Player" + (i + 1) + " name", id));
    }
    var submit = document.createElement("button");
    submit.setAttribute("class", "btn btn-primary mx-auto " + id + "btn");
    submit.type = "submit";
    submit.innerText = "Confirm";
    form.append(submit);
    return form;
};
//placing HTML elements
var head = document.createElement("div");
head.setAttribute("class", "container bg-dark d-flex justify-content-center align-items-center");
var button = document.createElement("button");
button.setAttribute("class", "btn btn-outline-warning btn-lg m-2");
button.id = "play";
button.innerText = "Play";
button.disabled = true;
head.append(button);
var row_div = document.createElement("div");
row_div.setAttribute("class", "row m-5");
var team1_div = document.createElement("div");
team1_div.setAttribute("class", "col-lg-6 my-3");
var a = createForm("team1");
team1_div.append(a);
var team2_div = document.createElement("div");
team2_div.setAttribute("class", "col-lg-6 my-3");
var b = createForm("team2");
team2_div.append(b);
row_div.append(team1_div, team2_div);
document.body.append(head, row_div);
document.querySelector(".team2btn").disabled = true;
//adding event listeners
document.getElementById("team1").addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelector(".team2btn").disabled = false;
    var data = document.querySelectorAll(".team1");
    query = "?";
    var start = 1;
    data.forEach(function (val) {
        query += "para" + start + "=" + val.value + "&";
        start++;
    });
    alert("Players for team1 confirmed");
    document.querySelector(".team1btn").disabled = true;
});
document.getElementById("team2").addEventListener("submit", function (e) {
    e.preventDefault();
    var data = document.querySelectorAll(".team2");
    var start = 11;
    data.forEach(function (val) {
        query += "para" + start + "=" + val.value + "&";
        start++;
    });
    query = query.slice(0, query.length - 1);
    console.log(query);
    alert("Players for team2 confirmed");
    document.getElementById("play").disabled = false;
    document.querySelector(".team2btn").disabled = true;
});
document.getElementById("play").addEventListener("click", function () {
    var url = "game.html";
    window.location.href = url + query;
});
