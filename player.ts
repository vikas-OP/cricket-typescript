export class Player {
  name: string;
  balls: number;
  score: number[];
  total: number;
  constructor(name: string) {
    this.name = name;
    this.balls = 6;
    this.score = [];
    this.total = 0;
  }
  hit = () => {
    let score = Math.floor(Math.random() * 7);
    if (this.balls === 0 || score === 0) {
      return -1;
    }

    this.score.push(score);
    this.total += score;
    this.balls--;
    return score;
  };
}
