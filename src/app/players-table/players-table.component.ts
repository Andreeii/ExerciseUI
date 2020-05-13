import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TournamentPlayer } from '../services/player.service';
import { IPlayer } from '../models/player.model';
import { MatTableDataSource } from '@angular/material/table';
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

@Component({
  selector: 'players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements AfterViewInit {

  playerTable: IPlayer[];
  pagedPlayers: PagedResult<IPlayer>;


  tableColumns: TableColumn[] = [
    { name: 'id', index: 'id', displayName: 'Id' },
    { name: 'name', index: 'name', displayName: 'Price' },
    { name: 'surname', index: 'surname', displayName: 'Surname' },
    { name: 'userName', index: 'userName', displayName: 'Username', useInSearch: true },
    { name: 'email', index: 'email', displayName: 'Email' },
    { name: 'registrationDate', index: 'registrationDate', displayName: 'RegistrationDate' }
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
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
    this.filterForm = this.formBuilder.group({
      userName: ['']
    });
  }

  ngAfterViewInit() {
    this.loadBooksFromApi();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadBooksFromApi();
    });
  }

  loadBooksFromApi() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this.playerService.getPlayersPaged(paginatedRequest)
      .subscribe((pagedPlayers: PagedResult<IPlayer>) => {
        this.pagedPlayers = pagedPlayers;
        console.log(pagedPlayers);

      });
  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.loadBooksFromApi();
  }

  resetGrid() {
    this.requestFilters = { filters: [], logicalOperator: FilterLogicalOperators.And };
    this.loadBooksFromApi();
  }

  filterBooksFromForm() {
    this.createFiltersFromForm();
    this.loadBooksFromApi();
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

}
