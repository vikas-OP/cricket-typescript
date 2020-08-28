let results = decodeURIComponent(location.search);
results = results.slice(1);
let resultsF = results.split("&");
resultsF = resultsF.map((val) => val.slice(5));
let contain_div = <HTMLDivElement>document.createElement("div");
contain_div.setAttribute("class", "container p-2");
let p2 = <HTMLParagraphElement>document.createElement("p");
p2.setAttribute("class", "display-4 text-center");
p2.innerText = "RESULTS";
let p3 = <HTMLParagraphElement>document.createElement("p");
p3.setAttribute("class", "h3 text-center py-2");
p3.innerHTML = `MATCH WON BY<br/>${resultsF[0]}`;
let p4 = <HTMLParagraphElement>document.createElement("p");
p4.setAttribute("class", "h3 text-center py-2");
p4.innerHTML = `MAN OF THE MATCH<br/>${resultsF[1]}<br/>${resultsF[3]}`;
let p5 = <HTMLParagraphElement>document.createElement("p");
p5.setAttribute("class", "h3 text-center py-2");
p5.innerHTML = `SCORE: ${resultsF[2]}`;
let play_button_div = <HTMLDivElement>document.createElement("div");
play_button_div.setAttribute(
  "class",
  "d-flex justify-content-around align-items-center"
);
let play_again_button = <HTMLButtonElement>document.createElement("button");
play_again_button.setAttribute("class", "btn btn-primary btn-md");
play_again_button.innerText = "Play Again";
let home_button = <HTMLButtonElement>document.createElement("button");
home_button.setAttribute("class", "btn btn-danger btn-md");
home_button.innerText = "Home page";
play_button_div.append(play_again_button, home_button);
contain_div.append(p2, p3, p4, p5, play_button_div);
document.body.append(contain_div);

play_again_button.addEventListener("click", () => {
  window.history.back();
});

home_button.addEventListener("click", () => {
  window.location.href = "index.html";
});
