//for passing names to other page

let query = "";

//creating each input
let createInput = (text: string, id: string) => {
  let div = <HTMLDivElement>document.createElement("div");
  div.setAttribute("class", "form-group");
  let input = <HTMLInputElement>document.createElement("input");
  input.type = "text";
  input.placeholder = text;
  input.required = true;
  input.setAttribute("class", `form-control ${id} text-dark`);
  div.append(input);
  return div;
};

//creating form function
let createForm = (id: string) => {
  let form = <HTMLFormElement>document.createElement("form");
  form.id = id;
  form.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    form.append(createInput(`Player${i + 1} name`, id));
  }
  let submit = <HTMLButtonElement>document.createElement("button");
  submit.setAttribute("class", `btn btn-primary mx-auto ${id}btn`);
  submit.type = "submit";
  submit.innerText = "Confirm";
  form.append(submit);
  return form;
};

//placing HTML elements
let head = <HTMLDivElement>document.createElement("div");
head.setAttribute(
  "class",
  "container bg-dark d-flex justify-content-center align-items-center"
);
let button = <HTMLButtonElement>document.createElement("button");
button.setAttribute("class", "btn btn-outline-warning btn-lg m-2");
button.id = "play";
button.innerText = "Play";
button.disabled = true;
head.append(button);
let row_div = <HTMLDivElement>document.createElement("div");
row_div.setAttribute("class", "row m-5");
let team1_div = <HTMLDivElement>document.createElement("div");
team1_div.setAttribute("class", "col-lg-6 my-3");
let a = createForm("team1");
team1_div.append(a);
let team2_div = <HTMLDivElement>document.createElement("div");
team2_div.setAttribute("class", "col-lg-6 my-3");
let b = createForm("team2");
team2_div.append(b);
row_div.append(team1_div, team2_div);
document.body.append(head, row_div);
(<HTMLButtonElement>document.querySelector(".team2btn")).disabled = true;

//adding event listeners
(<HTMLFormElement>document.getElementById("team1")).addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    (<HTMLButtonElement>document.querySelector(".team2btn")).disabled = false;
    let data = document.querySelectorAll(".team1");
    query = "?";
    let start = 1;
    data.forEach((val) => {
      query += `para${start}=${(<HTMLInputElement>val).value}&`;
      start++;
    });
    alert("Players for team1 confirmed");
    (<HTMLButtonElement>document.querySelector(".team1btn")).disabled = true;
  }
);
(<HTMLFormElement>document.getElementById("team2")).addEventListener(
  "submit",
  (e) => {
    e.preventDefault();
    let data = document.querySelectorAll(".team2");
    let start = 11;
    data.forEach((val) => {
      query += `para${start}=${(<HTMLInputElement>val).value}&`;
      start++;
    });
    query = query.slice(0, query.length - 1);
    console.log(query);
    alert("Players for team2 confirmed");
    (<HTMLButtonElement>document.getElementById("play")).disabled = false;
    (<HTMLButtonElement>document.querySelector(".team2btn")).disabled = true;
  }
);

(<HTMLButtonElement>document.getElementById("play")).addEventListener(
  "click",
  () => {
    let url = `game.html`;
    window.location.href = url + query;
  }
);
