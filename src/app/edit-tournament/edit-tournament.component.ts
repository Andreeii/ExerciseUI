import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { TournamentDto, GameDto } from '../models/tournament-table.model';
import { Router } from '@angular/router';
import { TournamentPlayer } from '../services/player.service';

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

  constructor(private dataService: DataService, private editTournamentService: TournamentTableService, private router: Router, private playerService: TournamentPlayer) { }

  ngOnInit(): void {
    this.id = this.dataService.getId();
    this.editTournamentService.getTournamentById(this.id).subscribe(x => this.onTour(x));
  }

  async onTour(tour) {

    this.tournament = tour;
    this.newGameList = this.prepareGameList(this.tournament.games);
    const firstRow = this.newGameList[0];
    const firstPlayerId = firstRow[0].playerGames[0].playerId;
    const player1 = await this.playerService.getPlayerById(firstPlayerId).toPromise();
    const firstPlayer = { id: firstPlayerId, userName: player1.userName }
    this.players = await Promise.all([firstPlayer, ...this.newGameList[0].map(async (games) => {
      const secondPlayerId = games.playerGames.filter(el => el.playerId !== firstPlayerId)[0].playerId;
      const player = await this.playerService.getPlayerById(secondPlayerId).toPromise();
      return { id: secondPlayerId, userName: player.userName };
    })]);

    this.scoreTable = this.generateInitialTable();
    this.populateTable(this.scoreTable);
  }


  playerUpdated(cell: TableCell) {
    if (cell.checked) {
      this.scoreTable[cell.column][cell.row].checked = false;
    }
    const arrayOfBooleans = this.scoreTable.map(x => x.map(y => y.checked));
    console.log('arrayOfBooleans', arrayOfBooleans);
    console.log('this.scoreTable', this.scoreTable);
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
      const rowPlayerId = this.players[i].id; 
      for (let j = i + 1; j < this.players.length; j++) {
        const game = listForRow[j - i - 1];
        const playerGame1 = game.playerGames.find(el => el.playerId === rowPlayerId);
        const playerGame2 = game.playerGames.find(el => el.playerId !== rowPlayerId);
        const obj = {
          row: i,
          column: j,
          checked: i === j ? "x" : playerGame1.isWinner,
          playerIdByRow: playerGame1.playerId,
          id: playerGame1.gameId
        }
        table[i][j] = obj;

        const obj2 = {
          row: j,
          column: i,
          checked: i === j ? "x" : playerGame2.isWinner,
          playerIdByRow: playerGame2.playerId,
          id: playerGame2.gameId
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
          playerGames: [
            {
              playerId: player1.playerIdByRow,
              isWinner: !!player1.checked,
            },
            {
              playerId: player2.playerIdByRow,
              isWinner: !!player2.checked,
            }
          ],
          tournamentId: this.tournament.id,
        }
        Games.push(Game);
      }
    }

    const GamesWithId = Games.map((game, index) => {
      game.id = this.tournament.games[index].id
      game.playerGames = game.playerGames.map((playerGame, idx) => {
        playerGame.gameId = game.id;
        playerGame.id = this.tournament.games[index].playerGames[idx].id;
        return playerGame
      })
      return game;
    })

    const tournament = {
      name: this.tournament.name,
      games: GamesWithId,
      id: this.tournament.id
    }
    return tournament;
  }

  async saveTournament() {
    const tournament = this.createTournamentDto();
    console.log({ tournament })
    this.editTournamentService.updateTournament(tournament).subscribe(x => {
      console.log(x);
      this.router.navigate(['tournament-table']);
    });
  }

  routeToTournamentTablePage() {
    this.router.navigate(['tournament-table']);
  }

}
