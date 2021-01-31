import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userData: any[];
  displayedColumns: string[] = ['id', 'name'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  searchText: any;
  constructor(
    private taskService: UsersService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.taskService.getUserList().subscribe(res => {
      console.log(res);
      this.userData = res.users;
      this.dataSource = new MatTableDataSource(res.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, (err) => {
      console.log(err);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }
}
