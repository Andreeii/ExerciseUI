import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentPlayer } from '../services/player.service';
import { PlayerDto } from '../models/player.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;
  surName: string;
  email: string;
  username: string;
  password: string;

  Name = new FormControl('');
  surname = new FormControl('');
  Email = new FormControl('');
  userName = new FormControl('');
  constructor(private router: Router, private playerService: TournamentPlayer) { }

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
    this.playerService.updatePlayer(player).subscribe(p => console.log(p));
  }

}
