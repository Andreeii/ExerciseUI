import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from '../models/player.model';
import { TournamentPlayer } from '../services/player.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  hide = true;
  hide1 = true;
  
  curentPassword = new FormControl('');
  newPassword = new FormControl('');

  constructor(private router:Router, private playerService: TournamentPlayer) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['tournament-table']);
  }

  changePassword(){
    const passwordDto :ChangePassword={
      curentPassword :this.curentPassword.value,
      newPassword : this.newPassword.value
    }
    this.playerService.changePassword(passwordDto).subscribe(pass=>console.log(pass));
  }

}
