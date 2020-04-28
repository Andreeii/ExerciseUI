import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';
import { IPlayer } from '../models/player.model';
import { Subject } from 'rxjs';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { Router } from '@angular/router';


type TableCell = "x" | boolean;

@Component({
  selector: 'add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})

export class AddTournamentComponent implements OnInit {

  deselectMatchUp$: Subject<boolean> = new Subject();

  constructor(private dataService: DataService ,private postTournamentService:TournamentTableService,private router:Router) { }

  players: IPlayer[] = [];
  scoreTable: TableCell[][];
  tournamentName: string;


  ngOnInit() {
    this.players = this.dataService.getData() || [{ "id": 1, "userName": "a1" }, { "id": 2, "userName": "b1" }, { "id": 3, "userName": "c1" }, { "id": 4, "userName": "d1" }];
    this.tournamentName = this.dataService.getName();
    console.log(this.players);
    this.scoreTable = this.generateInitialTable();
  }

  saveTournament(){
    this.postTournamentService.postTournament().subscribe(x =>{
      console.log(x);
      this.postTournamentService.postGame().subscribe(y =>{
        console.log(y);
        this.postTournamentService.postPlayerGame().subscribe(z =>{
          console.log(z);
        });
      });
    });
  }

  matchUpSelected($event,i,j) {
    if ($event.checked) {
      this.deselectMatchUp$.next($event);
    }
    console.log($event,i,j,this.players[i]);
  }

  // change(newValue, i, j) {
  //   console.log(newValue, i, j);
  //   this.scoreTable[i][j] = newValue;
  //   this.scoreTable[j][i] = !newValue;
  //   console.log(this.scoreTable);
  // }

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

  routeToTournamentTablePage() {
    this.router.navigate(['tournament-table']);
  }
}
