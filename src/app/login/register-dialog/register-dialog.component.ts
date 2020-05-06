import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  dismiss(){
    this.dialogRef.close(null);
  }

}
