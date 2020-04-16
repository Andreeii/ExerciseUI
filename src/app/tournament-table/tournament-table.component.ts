import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router} from '@angular/router';
import { TournamentTableService } from './model-service/tournamnet-table.service';
import { ITournament } from './model-service/tournament-table.model';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.css']
})
export class TournamentTableComponent implements  OnInit {

dataSource: MatTableDataSource<ITournament>;
tournamentItemTable:ITournament[];


@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private router:Router, private torunamentService:TournamentTableService) {}

  displayedColumns = ['id', 'name','creationDate','winnerName','action'];

  ngOnInit() {
    this.torunamentService.getTournamentList()
    .subscribe(t => {
      this.tournamentItemTable = t;
      this.dataSource = new MatTableDataSource(t);
      this.dataSource.paginator = this.paginator;

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  routeToAddServicePage(){
    this.router.navigate(['add-tournament']);
}
}
