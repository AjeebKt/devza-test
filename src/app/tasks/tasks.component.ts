import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(
    private router: Router,
    private taskService: TasksService,
  ) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTasksList().subscribe(res => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  createTask() {
    this.router.navigate(['/app/tasks/create']);
  }

}
