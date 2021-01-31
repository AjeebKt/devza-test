import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from './tasks.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalService } from '../core/confirm-modal/confirm-modal.service';

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
    private confirmDialogService: ConfirmModalService,

  ) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getTasksList().subscribe(res => {
      console.log(res);
      this.low = res.tasks.filter(d => d.priority === '1');
      this.medium = res.tasks.filter(d => d.priority === '2');
      this.highPriority = res.tasks.filter(d => d.priority === '3');
      console.log(this.low, this.medium, this.highPriority);

    }, (err) => {
      console.log(err);
    });
  }

  createTask() {
    this.router.navigate(['/app/tasks/create']);
  }

  deleteTask(data) {
    const formdata = new FormData();
    formdata.append("taskid", data.id);

    const dialogOpts = { title: 'Confirm Dialog', message: `Are you sure want to delete <b>${data.message}</b>?` };
    this.confirmDialogService.openDialogModal(dialogOpts).subscribe(res => {
      if (res) {
        this.taskService.deleteTask(formdata).subscribe(res => {
          console.log(res);
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


  // drop000(event: CdkDragDrop<number[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  // /** Predicate function that only allows even numbers to be dropped into a list. */
  // evenPredicate(item: CdkDrag<number>) {
  //   return item.data % 2 === 0;
  // }

  // /** Predicate function that doesn't allow items to be dropped into a list. */
  // noReturnPredicate() {
  //   return false;
  // }

}
