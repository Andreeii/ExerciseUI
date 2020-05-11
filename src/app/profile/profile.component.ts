import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentPlayer } from '../services/player.service';
import { PlayerDto } from '../models/player.model';
import { FormControl, Validators } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public errorMsg;
  name: string;
  surName: string;
  email: string;
  username: string;

  Name = new FormControl('');
  surname = new FormControl('');
  Email = new FormControl('');
  userName = new FormControl('');
  constructor(private router: Router, private playerService: TournamentPlayer, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.playerService.getPlayer().subscribe(p => {
      this.name = p.name;
      this.surName = p.surname;
      this.email = p.email;
      this.username = p.userName;
      console.log(p);
    })
  }

  cancel() {
    this.router.navigate(['tournament-table']);
  }

  save() {
    const player: PlayerDto = {
      name: this.Name.value,
      surname: this.surname.value,
      userName: this.userName.value,
      email: this.Email.value
    }
    this.playerService.updatePlayer(player).subscribe(p=>{console.log(p)});
  }

  getErrorMessage(){
    if (this.Email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.Email.hasError('email') ? 'Not a valid email' : '';  }

}
