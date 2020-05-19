import { Component, OnInit } from '@angular/core';
import { WinnedTournaments } from '../models/tournament-table.model';
import { MatTableDataSource } from '@angular/material/table';
import { TournamentTableService } from '../services/tournamnet-table.service';


@Component({
  selector: 'my-achievements',
  templateUrl: './my-achievements.component.html',
  styleUrls: ['./my-achievements.component.css']
})
export class MyAchievementsComponent implements OnInit {

  dataSource: MatTableDataSource<WinnedTournaments>;
  tournamentItemTable: WinnedTournaments[];

  constructor(private torunamentService: TournamentTableService) { }

  ngOnInit(): void {
    this.getTournamentList();
  }
  displayedColumns: string[] = ['id', 'tournamentName','winnedGames'];

  getTournamentList() {
    this.torunamentService.getWinnedTournaments()
      .subscribe(t => {
        this.tournamentItemTable = t;
        this.dataSource = new MatTableDataSource(t);
        console.log(t);
        
      })
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
