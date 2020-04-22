import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { ITournament } from '../models/tournament-table.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../services/shared/data.service';
import { AddTournamentDialogComponent } from '../add-tournament-dialog/add-tournament-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.css']
})
export class TournamentTableComponent implements OnInit {

  dataSource: MatTableDataSource<ITournament>;
  tournamentItemTable: ITournament[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor( private dialog: MatDialog,private dataService:DataService,private router: Router, private torunamentService: TournamentTableService) { }

  displayedColumns = ['id', 'name', 'creationDate', 'winnerName', 'action'];

  ngOnInit() {
    this.torunamentService.getTournamentList()
      .subscribe(t => {
        this.tournamentItemTable = t;
        this.dataSource = new MatTableDataSource(t);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  routeToAddTournamentPage() {
    this.router.navigate(['add-tournament']);
  }

  openAddTournamentDialog(): void {
    let dialogRef = this.dialog.open(AddTournamentDialogComponent, {
      width: '600px',
      height:'600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.dataService.setData(result);
      this.routeToAddTournamentPage();
    });

  }
}
