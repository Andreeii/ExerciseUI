import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login.component';
import { TournamentPlayer } from 'src/app/services/player.service';
import { PlayerDto } from 'src/app/models/player.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  userName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  selectedRole:string;
  rolesList = [];

  errorMessage: string;
  constructor(private dialogRef: MatDialogRef<LoginComponent>, private playerService: TournamentPlayer) { }

  ngOnInit(): void {
    this.playerService.getRoles().subscribe(roles => this.rolesList = roles);
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  createPlayerDto() {
    const player: PlayerDto = {
      name: this.name.value,
      surname: this.surname.value,
      username: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      role:this.selectedRole
    }
    return player;
  }

  savePlayer() {
    const player = this.createPlayerDto();
    this.playerService.postPlayer(player).subscribe(x => {
      console.log(x);
    });
    this.dialogRef.close(null);
  }
  getErrorMessage() {
  }

  getPlayerRoles() {

  }

}
