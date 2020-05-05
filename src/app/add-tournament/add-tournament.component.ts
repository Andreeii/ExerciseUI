import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';
import { IPlayer } from '../models/player.model';
import { Subject } from 'rxjs';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { Router } from '@angular/router';
import { GameDto } from '../models/tournament-table.model';

type TableCell = {
  row: number;
  column: number;
  checked: boolean | string;
  playerIdByRow: number;
};

@Component({
  selector: 'add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})

export class AddTournamentComponent implements OnInit {

  deselectMatchUp$: Subject<boolean> = new Subject();

  constructor(private dataService: DataService, private postTournamentService: TournamentTableService, private router: Router) {
    this.scoreTable = this.generateInitialTable();

  }

  players: IPlayer[] = [];
  scoreTable: TableCell[][];
  tournamentName: string;


  ngOnInit() {
    this.players = this.dataService.getData() || [{ "id": 1, "userName": "a1" }, { "id": 2, "userName": "b1" }, { "id": 3, "userName": "c1" }];
    this.tournamentName = this.dataService.getName();
    console.log(this.players);
    this.scoreTable = this.generateInitialTable();
  }

  saveTournament() {
    const tournament = this.createTournamentDto();
    this.postTournamentService.postTournament(tournament).subscribe(x => {
      console.log(x);
    });
    this.routeToTournamentTablePage();
  }

  editTournament(id: number) {
    id = this.dataService.getId();
    this.postTournamentService.getTournamentById(id).subscribe(x =>console.log(x));
    
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
      name: this.tournamentName,
      game: Games
    }
    return tournament;
  }

  playerUpdated(cell: TableCell) {
    if (cell.checked) {
      this.scoreTable[cell.column][cell.row].checked = false;
    }
    const arrayOfBooleans = this.scoreTable.map(x => x.map(y => y.checked));
    console.log('arrayOfBooleans', arrayOfBooleans);
    console.log('this.scoreTable', /*JSON.stringify(this.scoreTable, undefined, 2)*/this.scoreTable);
  }

  // generating table
  generateInitialTable(): TableCell[][] {
    const table: TableCell[][] = [];

    for (let i = 0; i < this.players.length; ++i) {
      table.push([]);
      for (let j = 0; j < this.players.length; ++j) {
        const obj: TableCell = {
          row: i,
          column: j,
          checked: i === j ? "x" : false,
          playerIdByRow: this.players[i].id
        }
        table[i].push(obj);
      }
    }
    return table;
  }

  routeToTournamentTablePage() {
    this.router.navigate(['tournament-table']);
  }
}
