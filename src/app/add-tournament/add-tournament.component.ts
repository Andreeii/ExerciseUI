import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';
import { IPlayer } from '../models/player.model';
import { Subject } from 'rxjs';


/**
 * Mocks
 * const tournamentDto = { id: 1, name: "T1" };
 * const gameDto = { id: 1, tournamentId: 1 };
 *
 * const player_gameDto = { id: 1, playerId: 1, isWinner: true };
 * const player_gameDto = { id: 2, playerId: 2, isWinner: false };
 */

/**
 * We have 2 buttons: Save and Cancel
 * On Save button click a function (onSave) should be called that create all object (Dto) that will be send tp backend to be saved in DB
 * onSave behavior:
 * create TournamentDto, GameDto, PlayerGameDto
 *
 * TournamentDto { id, name }
 * const tournamentDto = ...
 *
 * GameDto {id, tournamentId }
 * const gameDtos: GameDto[] = ...
 *
 * PlayerGameDto { id, playerId, gameId, isWinner }
 * const playerGameDtos: PlayerGameDto[] = ...
 *
 * const addTournamentService = new AddTournamentService();
 *
 * addTournamentService.createTournament(tournamentDto, gameDtos, playerGameDtos);
 *
 * class AddTournamentService {
 *   ...
 *
 *   createTournament(tournamentDto, gameDtos, playerGameDtos) {
 *     TournamentTableService.postTournament(tournamentDto);
 *     ... .postGames
 *     ... .postPlayerGames
 *   }
 * }
 */

type TableCell = "x" | boolean;

@Component({
  selector: 'add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

  deselectMatchUp$: Subject<boolean> = new Subject();

  constructor(private dataService: DataService) { }

  players: IPlayer[] = [];
  scoreTable: TableCell[][];
  tournamentName: string;

  ngOnInit() {
    this.players = this.dataService.getData() || [{ "id": 1, "userName": "a1" }, { "id": 2, "userName": "b1" }, { "id": 3, "userName": "c1" }, { "id": 4, "userName": "d1" }];
    this.tournamentName = this.dataService.getName();
    console.log(this.players);
    this.scoreTable = this.generateInitialTable();
  }

  matchUpSelected($event) {
    if ($event.checked) {
      this.deselectMatchUp$.next($event);
    }
  }

  change(newValue, i, j) {
    console.log(newValue, i, j);
    this.scoreTable[i][j] = newValue;
    this.scoreTable[j][i] = !newValue;
   // console.table(this.scoreTable);
  }

  // generating table
  generateInitialTable(): TableCell[][] {
    const table: TableCell[][] = [];

    for (let i = 0; i < this.players.length; ++i) {
      table.push([]);
      for (let j = 0; j < this.players.length; ++j) {
        const value = i === j ? "x" : false;
        table[i].push(value);
      }
    }
    return table;
  }
}
