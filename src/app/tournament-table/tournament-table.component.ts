import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TournamentTableService } from '../services/tournamnet-table.service';
import { ITournament } from '../models/tournament-table.model';
import { AddTournamentDialogComponent } from './add-tournament-dialog/add-tournament-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DataService } from '../services/shared/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.css']
})
export class TournamentTableComponent implements OnInit {

  dataSource: MatTableDataSource<ITournament>;
  progress: Promise<number[]>;

  constructor(private router: Router, private dataService: DataService, private dialog: MatDialog, private torunamentService: TournamentTableService) { }

  displayedColumns = ['id', 'tournamentName', 'winnerName', 'Nr.WinnedGames', 'action', 'progress'];


  async ngOnInit() {
    await this.getTournamentList();
  }

  async getTournamentList() {
    this.dataSource = new MatTableDataSource();
    
     this.torunamentService.getTournamentList()
      .subscribe(t => {
        this.dataSource.data = t;
      });
     this.torunamentService.getProgress()
    .subscribe(res => {
      this.dataSource.data.forEach((item, index) => {
        item['progress'] = res[index];
      });
    });

  }


  openAddTournamentDialog(): void {
    let dialogRef = this.dialog.open(AddTournamentDialogComponent, {
      width: '600px',
      height: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(() => { this.getTournamentList() });
  }

  openDeleteTournamentDialog(id: number): void {
    this.dataService.setData(id);
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(() => {this.getTournamentList()});
  }


  editTournament(id: number) {
    this.dataService.setId(id);
    this.router.navigate(['edit-tournament']);
  }
  viewTournament(id: number) {
    this.dataService.setId(id);
    this.router.navigate(['view-tournament']);
  }

  roleMatch(allowedRoles): boolean {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('accessToken').split('.')[1]));
    var userRole = payLoad['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (allowedRoles == userRole)
      return true;
    else
      return false;
  }
}
