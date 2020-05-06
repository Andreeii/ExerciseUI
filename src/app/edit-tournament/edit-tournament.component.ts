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
  tournament: TournamentDto;
  players: IPlayer[] = [];


  constructor(private dataService: DataService, private editTournamentService: TournamentTableService) { }

  ngOnInit(): void {
    this.id = this.dataService.getId();
    // this.editTournamentService.getTournamentById(this.id).subscribe(x => this.onTour(x));
    this.editTournamentService.getTournamentById(this.id).subscribe(x => console.log(x));
  }

  // const phoneNumbers = users.reduce((pn, u) => [...pn, ...u.phoneNumbers], []);

  // generateInitialTable(): TableCell[][] {
  //   const table: TableCell[][] = [];

  //   for (let game of this.tournament.game) {
  //     table.push([]);
  //       for(let playerGame of game.playerGame){
  //         const obj: TableCell = {
  //           row: i,
  //           column: j,
  //           checked: i === j ? "x" : false,
  //           playerIdByRow: this.players[i].id
  //         }
  //         table[i].push(obj);
  //       }
  //   }

  //   for (let i = 0; i < this.tournament.game; ++i) {
  //     table.push([]);
  //     for (let j = 0; j < this.players.length; ++j) {
  //       const obj: TableCell = {
  //         row: i,
  //         column: j,
  //         checked: i === j ? "x" : false,
  //         playerIdByRow: this.players[i].id
  //       }
  //       table[i].push(obj);
  //     }
  //   }
  //   return table;
  // }
}
