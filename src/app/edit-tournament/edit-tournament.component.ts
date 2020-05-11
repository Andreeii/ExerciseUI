import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { TournamentDto } from '../models/tournament-table.model';
import { IPlayer } from '../models/player.model';

type TableCell = {
  row: number;
  column: number;
  checked: boolean | string;
  playerIdByRow: number;
};

@Component({
  selector: 'edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {

  id: number;
  players: IPlayer[] = [];
  tournament: TournamentDto;

  constructor(private dataService: DataService, private editTournamentService: TournamentTableService) { }

  ngOnInit(): void {
    this.id = this.dataService.getId();
    // this.editTournamentService.getTournamentById(this.id).subscribe(x => this.onTour(x));
    this.editTournamentService.getTournamentById(this.id).subscribe(x=>console.log(x));

  }

  // onTour(tour) {
  //   this.tournament = tour;
  //   const newGameList = this.prepareGameList(this.tournament.game);
  //   const firstRow = newGameList[0];
  //   const firstPlayer = { id: firstRow.playerGame[0].playerId, playerName: firstRow.playerGame[0].playerId }
  //   this.players = []
  // }
  // prepareGameList(games) {
  //   const list = games.slice();
  //   const result = [];
  //   list.reverse();
  //   let counter = 1;

  //   while (list.length) {
  //     const removed = list.splice(0, counter);
  //     result.push(removed.reverse());
  //     counter++;
  //   }

  //   return result.reverse();
  // }

  // const newGameList = prepareGameList(t.game);
  // const playersCount = newGameList[0].length + 1;

  // generateInitialTable() {
  //   const table = [];

  //   for (let i = 0; i < playersCount; ++i) {
  //     table.push([]);
  //     for (let j = 0; j < playersCount; ++j) {
  //       const obj = {
  //         row: i,
  //         column: j,
  //         checked: i === j ? "x" : false,
  //         playerIdByRow: 1
  //       }
  //       table[i].push(obj);
  //     }
  //   }
  //   return table;
  // }

  // populateTable(table) {
  //   for (let i = 0; i < playersCount; i++) {
  //     const listForRow = newGameList[i];
  //     for (let j = i + 1; j < playersCount; j++) {
  //       const game = listForRow[j - i - 1];
  //       const [playerGame1, playerGame2] = game.playerGame
  //       const obj = {
  //         row: i,
  //         column: j,
  //         checked: i === j ? "x" : playerGame1.isWinner,
  //         playerIdByRow: playerGame1.playerId,
  //       }
  //       table[i][j] = obj;

  //       const obj2 = {
  //         row: j,
  //         column: i,
  //         checked: i === j ? "x" : playerGame2.isWinner,
  //         playerIdByRow: playerGame2.playerId,
  //       }
  //       table[j][i] = obj2;
  //     }
  //   }
  // }

}
