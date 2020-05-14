import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentPlayer } from '../services/player.service';
import { PlayerDto } from '../models/player.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // name: string;
  // surName: string;
  // email: string;
  // username: string;

  // name = new FormControl('',[Validators.required,Validators.maxLength(8)]);
  // surname = new FormControl('');
  // email = new FormControl('');
  // userName = new FormControl('');

  form: FormGroup;
  constructor(private router: Router, private playerService: TournamentPlayer, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.initializeForm();
    this.getPlayer()
  }

  getPlayer() {
    this.playerService.getPlayer().subscribe(p => {

      this.form.patchValue({ ...p });
    })
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      surname: new FormControl(''),
      email: new FormControl('',[Validators.required,Validators.email]),
      userName: new FormControl('')
    });
  }

  cancel() {
    this.router.navigate(['tournament-table']);
  }

  save() {
    const player: PlayerDto = {
      ...this.form.getRawValue()
    }
    this.playerService.updatePlayer(player).subscribe(p => { console.log(p) });
  }

  getErrorMessage() {
    if (this.form.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('email').hasError('email') ? 'Not a valid email' : '';
  }

}
