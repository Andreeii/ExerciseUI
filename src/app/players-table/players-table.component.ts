import { Component, OnInit, ViewChild } from '@angular/core';
import { TournamentPlayer } from '../services/player.service';
import { IPlayer } from '../models/player.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  dataSource: MatTableDataSource<IPlayer>;
  playerTable: IPlayer[];
  displayedColumns: string[] = ['id', 'Name', 'Surname', 'Username','Email','RegistrationDate'];
  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(private playerService:TournamentPlayer) { }

  ngOnInit(): void {
    this.getPlaeyrList();
  }

  getPlaeyrList() {
    this.playerService.getPlayerList()
      .subscribe(t => {
        this.playerTable = t;
        this.dataSource = new MatTableDataSource(t);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(t);
        
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
