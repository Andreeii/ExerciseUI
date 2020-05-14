import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/shared/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TournamentPlayer } from 'src/app/services/player.service';

@Component({
  selector: 'app-delete-player-dialog',
  templateUrl: './delete-player-dialog.component.html',
  styleUrls: ['./delete-player-dialog.component.css']
})
export class DeletePlayerDialogComponent implements OnInit {

  id:number;
  constructor(private dataService: DataService, private dialogRef: MatDialogRef<DeletePlayerDialogComponent>,private playerService:TournamentPlayer) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  deletePlayer() {
    this.id = this.dataService.getData();
    console.log(this.id);
    this.playerService.deletePlayer(this.id).subscribe();
    this.dismiss();
  }

}
