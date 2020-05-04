import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TournamentTableService } from 'src/app/services/tournamnet-table.service';
import { DataService } from 'src/app/services/shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})

export class DeleteDialogComponent implements OnInit {

  id: number;
  constructor(private router:Router,private dataService: DataService, private dialogRef: MatDialogRef<DeleteDialogComponent>, private tournamentService: TournamentTableService) { }

  ngOnInit(): void {
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  deleteTournament() {
    this.id = this.dataService.getData();
    console.log(this.id);
    this.tournamentService.deleteTournament(this.id).subscribe();
    this.dismiss();
  }
  
  routeToTournamentTablePage() {
    this.router.navigate(['tournament-table']);
  }
}
