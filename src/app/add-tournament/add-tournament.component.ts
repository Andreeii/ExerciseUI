import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/shared/data.service';



@Component({
  selector: 'add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})

export class AddTournamentComponent implements OnInit {

  dataSource = [];
  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.dataSource = this.dataService.getData();
    console.log("selected items",this.dataSource);
  }




}


