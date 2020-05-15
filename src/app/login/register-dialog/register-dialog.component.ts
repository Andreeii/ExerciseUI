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
  hide = true;

  imgUrl: string = "/assets/images/unnamed.jpg";
  fileToUpload: File = null;

  name = new FormControl('', [Validators.required]);
  surname = new FormControl('', [Validators.required]);
  userName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  selectedRole: string;
  rolesList = [];

  errorMessage: string;
  constructor(private dialogRef: MatDialogRef<LoginComponent>, private playerService: TournamentPlayer) { }

  ngOnInit(): void {
    this.playerService.getRoles().subscribe(roles => this.rolesList = roles);
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  saveImage(){
    this.playerService.uploadImage(this.fileToUpload).subscribe(i=>console.log(i));
  }


  dismiss() {
    this.dialogRef.close(null);
  }

  createPlayerDto() {
    const player: PlayerDto = {
      name: this.name.value,
      surname: this.surname.value,
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      role: this.selectedRole
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
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('minLength(5)') ? 'Not a valid password' : '';
  }
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
