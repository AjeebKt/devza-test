import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from './tasks.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalService } from '../core/confirm-modal/confirm-modal.service';
import { DatePipe } from '@angular/common';
import { GlobalDataService } from '../core/services/global-data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  low = [];
  medium = [];
  highPriority = [];
  constructor(
    private router: Router,
    private taskService: TasksService,
    private toastrService: ToastrService,
    private gd: GlobalDataService,
    private confirmDialogService: ConfirmModalService,

  ) { }

  ngOnInit(): void {
    this.getTaskList();
    this.gd.taskToEdit = null;
  }

  get sortLowData() {
    return this.low.sort((a, b) => {
      return <any>new Date(a.due_date) - <any>new Date(b.due_date);
    });
  }
  get sortMediumData() {
    return this.medium.sort((a, b) => {
      return <any>new Date(a.due_date) - <any>new Date(b.due_date);
    });
  }
  get sortHighData() {
    return this.highPriority.sort((a, b) => {
      return <any>new Date(a.due_date) - <any>new Date(b.due_date);
    });
  }

  getTaskList() {
    this.taskService.getTasksList().subscribe(res => {
      // console.log(res);
      this.low = res.tasks.filter(d => d.priority === '1');
      this.medium = res.tasks.filter(d => d.priority === '2');
      this.highPriority = res.tasks.filter(d => d.priority === '3');
      // console.log(this.low, this.medium, this.highPriority);

    }, (err) => {
      console.log(err);
    });
  }

  createTask() {
    this.router.navigate(['/app/tasks/create']);
  }

  editTask(data) {
    this.gd.taskToEdit = data;
    this.router.navigate(['/app/tasks/edit']);
  }

  deleteTask(data) {
    const formdata = new FormData();
    formdata.append("taskid", data.id);

    const dialogOpts = { title: 'Confirm Dialog', message: `Are you sure want to delete <b>${data.message}</b>?` };
    this.confirmDialogService.openDialogModal(dialogOpts).subscribe(res => {
      if (res) {
        this.taskService.deleteTask(formdata).subscribe(res => {
          // console.log(res);
          this.getTaskList();
          this.toastrService.error(res.message, `Success`, {
            timeOut: 5000,
          });
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  updatePriority(data, id) {

    const datePipe = new DatePipe('en-US');
    data.due_date = datePipe.transform(data.due_date, 'yyyy-MM-dd hh:mm:ss');

    const formdata = new FormData();
    formdata.append("message", data.message);
    formdata.append("due_date", data.due_date);
    formdata.append("priority", id);
    formdata.append("assigned_to", data.assigned_to);
    formdata.append("taskid", data.id);
    // console.log(data);
    // return;

    this.taskService.updateTask(formdata).subscribe(res => {
      // console.log(res);
      if (res.status === 'success') {
        this.toastrService.success(`Updated Successfully`, `Success`, {
          timeOut: 5000,
        });
        this.getTaskList();
      } else {
        this.toastrService.error(`Somthing went wrong`, `Error`, {
          timeOut: 5000,
        });
        this.getTaskList();
      }
    }, (err) => {
      this.toastrService.error(err.response.Message, `Error`, {
        timeOut: 5000,
      });
      this.getTaskList();
    });
  }


  drop(event: CdkDragDrop<string[]>, id) {


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // console.log(event.item.data);
      // console.log(id);
      this.updatePriority(event.item.data, id)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


}
