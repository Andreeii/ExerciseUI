import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { ITournament } from '../models/tournament-table.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddTournamentDialogComponent } from '../add-tournament-dialog/add-tournament-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DataService } from '../services/shared/data.service';


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


  constructor(private dataService: DataService, private dialog: MatDialog, private torunamentService: TournamentTableService) { }

  displayedColumns = ['id', 'tournamentName', 'winnerName', 'Nr.WinnedGames', 'action'];

  ngOnInit() {
    this.getTournamentList()
  }

  getTournamentList() {
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

  openAddTournamentDialog(): void {
    let dialogRef = this.dialog.open(AddTournamentDialogComponent, {
      width: '600px',
      height: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  openDeleteTournamentDialog(id: number): void {
    this.dataService.setData(id);
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(() =>{this.getTournamentList()});
  }


}
