import { Component, OnInit } from '@angular/core';
import { IPlayer } from './model-service/add-torunament.model';
import {TournamentPlayer} from './model-service/add-tournament.service'
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {

  public players =[];
  constructor(private _players:TournamentPlayer) { }

  ngOnInit(): void {
    this._players.getPlayerList()
    .subscribe(p =>this.players = p)
  }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Enter Tournament Name';
    }
  }

}
