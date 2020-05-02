import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';
import { IPlayer } from '../models/player.model';
import { Subject } from 'rxjs';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { Router } from '@angular/router';


type TableCell = {
  row: number;
  column: number;
  checked: boolean | string
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
    this.players = this.dataService.getData() || [{ "id": 1, "userName": "a1" }, { "id": 2, "userName": "b1" }, { "id": 3, "userName": "c1" }, { "id": 4, "userName": "d1" }];
    this.tournamentName = this.dataService.getName();
    console.log(this.players);
    this.scoreTable = this.generateInitialTable();
  }

  saveTournament() {
    this.postTournamentService.postTournament().subscribe(x => {
      console.log(x);
    });
  }

  playerUpdated(cell: TableCell) {
    if (cell.checked) {
      this.scoreTable[cell.column][cell.row].checked = false;
    }
    const arrayOfBooleans = this.scoreTable.map(x => x.map(y => y.checked));
    console.log('arrayOfBooleans', arrayOfBooleans);
    console.log('this.scoreTable', this.scoreTable);
  }

  // generating table
  generateInitialTable(): TableCell[][] {
    const table: TableCell[][] = [];

    for (let i = 0; i < this.players.length; ++i) {
      table.push([]);
      for (let j = 0; j < this.players.length; ++j) {
        const value = i === j ? "x" : false;
        const obj: TableCell = {
          row: i,
          column: j,
          checked: i === j ? "x" : false
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
