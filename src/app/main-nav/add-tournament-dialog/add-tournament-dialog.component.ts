import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TournamentPlayer } from 'src/app/add-tournament/model-service/add-tournament.service';
import { MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { ITournament } from 'src/app/tournament-table/model-service/tournament-table.model';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-tournament-dialog',
  templateUrl: './add-tournament-dialog.component.html',
  styleUrls: ['./add-tournament-dialog.component.css']
})
export class AddTournamentDialogComponent implements OnInit {

  tournament:ITournament;
  public players =[];
  name = new FormControl('', [Validators.required]);

  dropdownList = [];
  selectedItems =[];
  dropdownSettings:IDropdownSettings;

  constructor(private router:Router,private _players:TournamentPlayer ,private dialogRef:MatDialogRef<AddTournamentDialogComponent>) { }

  ngOnInit():void {
    this._players.getPlayerList()
    .subscribe(p=>this.dropdownList = p)
  
    this.selectedItems = [];
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'id',
      textField: 'userName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 9,
      allowSearchFilter: true
    };
  }

onItemSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
OnItemDeSelect(item:any){
    console.log(item);
    console.log(this.selectedItems);
}
onSelectAll(items: any){
    console.log(items);
}
onDeSelectAll(items: any){
    console.log(items);
}



  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Enter Tournament Name';
    }
  }
  
  create(){
    console.log("items",this.selectedItems);
    this.dialogRef.close(this.selectedItems);
  }
  
  dismiss(){
    this.dialogRef.close(null);
  }

  

}
