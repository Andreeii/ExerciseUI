import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/shared/data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TournamentPlayer } from 'src/app/services/player.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-player-dialog',
  templateUrl: './delete-player-dialog.component.html',
  styleUrls: ['./delete-player-dialog.component.css']
})
export class DeletePlayerDialogComponent implements OnInit {

  id: number;
  errorText: any;
  constructor(private snackBar: MatSnackBar, private dataService: DataService, private dialogRef: MatDialogRef<DeletePlayerDialogComponent>, private playerService: TournamentPlayer) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  deletePlayer() {
    this.id = this.dataService.getData();
    this.playerService.deletePlayer(this.id).subscribe(
      p => {
        this.snackBar.open("Player Deleted Succeseful", '', {
          duration: 3000,
          verticalPosition: 'top'
        })
      },
      error => {
        this.errorText = error;
        let finalMessage = this.errorText.error;
        this.snackBar.open(finalMessage, '', {
          duration: 3000,
          verticalPosition: 'top'
        })
      });
    this.dialogRef.close(null);
  }

}
