import { Team } from "./team";
export class Match {
  team1: Team;
  team2: Team;
  gameStarted: boolean;
  turn: number;
  constructor(team1: Team, team2: Team) {
    this.team1 = team1;
    this.team2 = team2;
    this.gameStarted = false;
    this.turn = 1;
  }

  startGame = () => {
    if (!this.gameStarted) {
      this.gameStarted = true;
      let time = [60];
      let setId = setInterval(() => {
        time[0] = time[0] - 1;
        if (time[0] === 0) {
          (<HTMLButtonElement>(
            document.querySelector(".hit_one")
          )).disabled = true;
          if (this.turn === 1) {
            (<HTMLButtonElement>(
              document.querySelector(".hit_two")
            )).disabled = false;
            this.gameStarted = false;
          } else {
            (<HTMLButtonElement>(
              document.querySelector(".hit_two")
            )).disabled = true;
            (<HTMLButtonElement>(
              document.querySelector("#generate")
            )).disabled = false;
          }
          clearInterval(setId);
        }
        (<HTMLParagraphElement>(
          document.querySelector(".timer")
        )).innerText = String(time[0]);
      }, 1000);
    }
  };
  stopGame = () => {
    if (this.turn !== 2) {
      this.gameStarted = false;
      this.turn = 2;
    } else {
      (<HTMLButtonElement>document.querySelector("#generate")).disabled = false;
    }
  };
  finalResults = () => {
    let score1: number;
    let score2: number;
    let query = "?";
    score1 = parseInt(
      (<HTMLParagraphElement>document.querySelector(".score_one")).innerText
    );
    score2 = parseInt(
      (<HTMLParagraphElement>document.querySelector(".score_two")).innerText
    );
    if (score1 > score2) {
      query += "team=TEAM1&";
    } else if (score2 > score1) {
      query += "team=TEAM2&";
    } else {
      query += "team=tied&";
    }
    let team1deets = this.team1.players;
    let team2deets = this.team2.players;
    let td1, td2;
    td1 = team1deets.map((val) => val.total);
    td2 = team2deets.map((val) => val.total);
    let high1 = Math.max(...td1);
    let high2 = Math.max(...td2);
    let name;
    if (high1 >= high2) {
      for (let i of team1deets) {
        if (i.total === high1) {
          name = i.name;
        }
      }
      query += `name=${name}&high=${high1}&teap=TEAM1`;
    } else {
      for (let i of team2deets) {
        if (i.total === high2) {
          name = i.name;
        }
      }
      query += `name=${name}&high=${high2}&teap=TEAM2`;
    }
    window.location.href = "final.html" + query;
  };
}
