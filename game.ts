import { Team } from "./team";
import { Player } from "./player";
import { Match } from "./match";
//disabling second player's hit button
(<HTMLButtonElement>document.querySelector(".hit_two")).disabled = true;

let playernames = decodeURIComponent(location.search);
playernames = playernames.slice(1);
let players = playernames.split("&");
let playersF: string[] = [];
players.forEach((val, i) => {
  if (i < 10) {
    playersF.push(val.slice(6));
  } else {
    playersF.push(val.slice(7));
  }
});
let team1 = new Team(playersF.slice(0, 10));
let team2 = new Team(playersF.slice(10));
let match = new Match(team1, team2);
//adding event listeners
let current = [0];
let ball = [1];
let hit_one_count = 1;
let team1_score = 0;
let hit_two_count = 1;
let team2_score = 0;
let hit_one = <HTMLButtonElement>document.querySelector(".hit_one");
let hit_two = <HTMLButtonElement>document.querySelector(".hit_two");
hit_one.addEventListener("click", () => {
  hit_one.innerText = `HIT ${hit_one_count}`;
  hit_one_count++;
  match.startGame();
  let score = match.team1.players[current[0]].hit();
  if (score !== -1) {
    (<HTMLTableCellElement>(
      document.getElementById(`ball${ball[0]}`)
    )).innerText = String(score);
    team1_score += score;
    (<HTMLParagraphElement>(
      document.querySelector(".score_one")
    )).innerText = String(team1_score);
    ball[0] = ball[0] + 1;
  } else {
    (<HTMLTableCellElement>(
      document.getElementById(`team1_total${current[0] + 1}`)
    )).innerText = String(match.team1.players[current[0]].total);
    ball[0] = (current[0] + 1) * 6 + 1;
    current[0] = current[0] + 1;
  }
  if (current[0] === 10) {
    hit_one.disabled = true;
    hit_two.disabled = false;
    for (var i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
    (<HTMLParagraphElement>document.querySelector(".timer")).innerText = String(
      0
    );
    match.stopGame();
  }
});

hit_two.addEventListener("click", () => {
  if (hit_two_count === 1) {
    ball[0] = 61;
    current[0] = 0;
  }
  hit_two.innerText = `HIT ${hit_two_count}`;
  hit_two_count++;
  match.startGame();
  let score = match.team2.players[current[0]].hit();
  if (score !== -1) {
    (<HTMLTableCellElement>(
      document.getElementById(`ball${ball[0]}`)
    )).innerText = String(score);
    team2_score += score;
    (<HTMLParagraphElement>(
      document.querySelector(".score_two")
    )).innerText = String(team2_score);
    ball[0] = ball[0] + 1;
  } else {
    (<HTMLTableCellElement>(
      document.getElementById(`team2_total${current[0] + 1}`)
    )).innerText = String(match.team2.players[current[0]].total);
    ball[0] = (current[0] + 1) * 6 + 61;
    current[0] = current[0] + 1;
  }
  if (current[0] === 10) {
    hit_two.disabled = true;
    for (var i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
    (<HTMLParagraphElement>document.querySelector(".timer")).innerText = String(
      0
    );
    match.stopGame();
  }
});

(<HTMLButtonElement>document.getElementById("generate")).addEventListener(
  "click",
  () => {
    match.finalResults();
  }
);
