import { Player } from "./player";
export class Team {
  players: Player[];
  constructor(names: string[]) {
    this.players = [];
    names.forEach((val: string) => {
      let player = new Player(val);
      this.players.push(player);
    });
  }
}
