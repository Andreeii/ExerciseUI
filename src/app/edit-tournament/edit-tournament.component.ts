import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { TournamentDto, GameDto } from '../models/tournament-table.model';
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
  players: any[] = [];
  newGameList: any[] = [];
  scoreTable: TableCell[][] = [];
  tournament: TournamentDto;

  constructor(private dataService: DataService, private editTournamentService: TournamentTableService) { }

  ngOnInit(): void {
    this.id = this.dataService.getId();
    this.editTournamentService.getTournamentById(this.id).subscribe(x => this.onTour(x));
    // this.editTournamentService.getTournamentById(this.id).subscribe(x=>console.log(x));

  }

  onTour(tour) {
    this.tournament = tour;
    this.newGameList = this.prepareGameList(this.tournament.game);
    const firstRow = this.newGameList[0];
    const firstPlayer = { id: firstRow[0].playerGame[0].playerId, userName: firstRow[0].playerGame[0].playerId }
    this.players = [firstPlayer, ...this.newGameList[0].map(game => {
      const secondPlayerId = game.playerGame[1].playerId;
      return { id: secondPlayerId, userName: `user${secondPlayerId}` };
    })];

    this.scoreTable = this.generateInitialTable();
    this.populateTable(this.scoreTable);
  }


  playerUpdated(cell: TableCell) {
    if (cell.checked) {
      this.scoreTable[cell.column][cell.row].checked = false;
    }
    const arrayOfBooleans = this.scoreTable.map(x => x.map(y => y.checked));
    console.log('arrayOfBooleans', arrayOfBooleans);
    console.log('this.scoreTable', /*JSON.stringify(this.scoreTable, undefined, 2),*/this.scoreTable);
  }

  prepareGameList(games) {
    const list = games.slice();
    const result = [];
    list.reverse();
    let counter = 1;

    while (list.length) {
      const removed = list.splice(0, counter);
      result.push(removed.reverse());
      counter++;
    }

    return result.reverse();
  }

  generateInitialTable() {
    const table = [];

    for (let i = 0; i < this.players.length; ++i) {
      table.push([]);
      for (let j = 0; j < this.players.length; ++j) {
        const obj = {
          row: i,
          column: j,
          checked: i === j ? "x" : false,
          playerIdByRow: 1
        }
        table[i].push(obj);
      }
    }
    return table;
  }

  populateTable(table) {
    for (let i = 0; i < this.players.length; i++) {
      const listForRow = this.newGameList[i];
      for (let j = i + 1; j < this.players.length; j++) {
        const game = listForRow[j - i - 1];
        const [playerGame1, playerGame2] = game.playerGame
        const obj = {
          row: i,
          column: j,
          checked: i === j ? "x" : playerGame1.isWinner,
          playerIdByRow: playerGame1.playerId,
        }
        table[i][j] = obj;

        const obj2 = {
          row: j,
          column: i,
          checked: i === j ? "x" : playerGame2.isWinner,
          playerIdByRow: playerGame2.playerId,
        }
        table[j][i] = obj2;
      }
    }
  }



  createTournamentDto() {
    const Games: GameDto[] = [];

    for (let i = 0; i < this.scoreTable.length; i++) {
      for (let j = i + 1; j < this.scoreTable.length; j++) {
        const player1 = this.scoreTable[i][j];
        const player2 = this.scoreTable[j][i];
        const Game: GameDto = {
          playerGame: [
            {
              playerId: player1.playerIdByRow,
              isWinner: !!player1.checked
            },
            {
              playerId: player2.playerIdByRow,
              isWinner: !!player2.checked
            }
          ]
        }
        Games.push(Game);
      }
    }
    const tournament = {
      name: this.tournament.name,
      game: Games,
      id: this.tournament.id
    }
    return tournament;
  }

  saveTournament() {
    const tournament = this.createTournamentDto();
    console.log({tournament})
    // this.postTournamentService.postTournament(tournament).subscribe(x => {
    //   console.log(x);
    // });
  }

}
