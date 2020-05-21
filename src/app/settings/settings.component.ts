import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from '../models/player.model';
import { TournamentPlayer } from '../services/player.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  errorText:any;

  constructor(private snackBar:MatSnackBar,private router:Router, private playerService: TournamentPlayer) { }

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
    this.playerService.changePassword(passwordDto).subscribe(
      p => {
        console.log(p);
        
        this.errorText = p;
        let finalMessage = "";
        if (this.errorText.errors.length != 0) {
          finalMessage = this.errorText.errors[0].description;
        } else {
          finalMessage = "Password Changed Successefully"
        }
        this.snackBar.open(finalMessage, '', {
          duration: 3000,
          verticalPosition: 'top'
        })
      },
      error => {
        this.errorText = error;
        let finalMessage = this.errorText.error;
        this.snackBar.open("Incorect Input of Curent Password", '', {
          duration: 3000,
          verticalPosition: 'top'
        })
      });
  }

}
