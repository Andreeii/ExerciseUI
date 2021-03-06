import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TournamentPlayer } from '../services/player.service';
import { IPlayer } from '../models/player.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PagedResult } from '../infrastructure/models/PagedResult';
import { TableColumn } from '../infrastructure/models/TableColumn';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { RequestFilters } from '../infrastructure/models/RequestFilters';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge } from 'rxjs';
import { PaginatedRequest } from '../infrastructure/models/PaginatedRequest';
import { Filter } from '../infrastructure/models/Filter';
import { FilterLogicalOperators } from '../infrastructure/models/FilterLogicalOperators';
import { DataService } from '../services/shared/data.service';
import { DeletePlayerDialogComponent } from './delete-player-dialog/delete-player-dialog.component';

@Component({
  selector: 'players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements AfterViewInit {

  playerTable: IPlayer[];
  pagedPlayers: PagedResult<IPlayer>;

  imgUrl:string = "http://localhost:60907/ProfileImage/";

  tableColumns: TableColumn[] = [
    { name: 'profileImage', index:'profileImage',displayName:'profileImage'},
    { name: 'id', index: 'id', displayName: 'Id' },
    { name: 'name', index: 'name', displayName: 'Price' },
    { name: 'surname', index: 'surname', displayName: 'Surname' },
    { name: 'userName', index: 'userName', displayName: 'Username', useInSearch: true },
    { name: 'email', index: 'email', displayName: 'Email' },
    { name: 'registrationDate', index: 'registrationDate', displayName: 'RegistrationDate' },
    { name: 'action', index:'action',displayName:'Action'}
  ];
  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;
  requestFilters: RequestFilters;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private playerService: TournamentPlayer,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private dataService: DataService,
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
    this.filterForm = this.formBuilder.group({
      userName: ['']
    });
  }

  ngAfterViewInit() {
    this.loadPlayersFromApi();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadPlayersFromApi();
    });
  }

  loadPlayersFromApi() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this.playerService.getPlayersPaged(paginatedRequest)
      .subscribe((pagedPlayers: PagedResult<IPlayer>) => {
        this.pagedPlayers = pagedPlayers;
        console.log(pagedPlayers);

      });
  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.loadPlayersFromApi();
  }

  resetGrid() {
    this.requestFilters = { filters: [], logicalOperator: FilterLogicalOperators.And };
    this.loadPlayersFromApi();
  }

  filterBooksFromForm() {
    this.createFiltersFromForm();
    this.loadPlayersFromApi();
  }
  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach(key => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn = this.tableColumns.find(tableColumn => tableColumn.name === key);
          const filter: Filter = { path: foundTableColumn.index, value: controlValue };
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters
      };
    }
  }

  private createFiltersFromSearchInput() {
    const filterValue = this.searchInput.value.trim();
    if (filterValue) {
      const filters: Filter[] = [];
      this.tableColumns.forEach(column => {
        if (column.useInSearch) {
          const filter: Filter = { path: column.index, value: filterValue };
          filters.push(filter);
        }
      });
      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.Or,
        filters
      };
    } else {
      this.resetGrid();
    }
  }

  roleMatch(allowedRoles): boolean {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('accessToken').split('.')[1]));
    var userRole = payLoad['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (allowedRoles == userRole)
      return true;
    else
      return false;
  }

  openDeletePlayerDialog(id: number): void {
    this.dataService.setData(id);
    let dialogRef = this.dialog.open(DeletePlayerDialogComponent);
    dialogRef.afterClosed().subscribe(() => { this.loadPlayersFromApi() });
  }


}
