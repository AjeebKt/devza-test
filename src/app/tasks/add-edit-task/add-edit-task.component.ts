import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalDataService } from 'src/app/core/services/global-data.service';
import { UsersService } from 'src/app/users/users.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  isEditPage: boolean;
  pageTitle: string;
  submitText: string;
  addEditForm: FormGroup;
  priorityList = [
    { name: 'Low', value: '1' },
    { name: 'Medium', value: '2' },
    { name: 'High', value: '3' }
  ];
  userList: any[];
  constructor(
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private gd: GlobalDataService,
    private tasksService: TasksService,
    private userService: UsersService,
    private toastrService: ToastrService
  ) {
    this.addEditForm = this.fb.group({
      message: ['', Validators.compose([Validators.required])],
      due_date: ['', Validators.compose([Validators.required])],
      priority: ['', Validators.required],
      assigned_to: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const action = this.activatedRoute.snapshot.url[0].path;
    // console.log(this.activatedRoute.snapshot.url[0].path);

    const isEditPage = action === 'edit';
    if (!action || (action !== 'create' && action !== 'edit')) {
      this.router.navigate(['/app/tasks']);
      return;
    }
    this.isEditPage = isEditPage;
    if (this.isEditPage) {
      this.isEditPage = true;
      // this.loadPage();
    }
    this.pageTitle = isEditPage ? 'Edit Task' : 'Add Task';
    this.submitText = isEditPage ? 'Update' : 'Save';
    this.getAllUsers();
  }

  get formContorls() { return this.addEditForm.controls; }

  getAllUsers() {
    this.userService.getUserList().subscribe(res => {
      console.log(res);
      this.userList = res.users;
    }, (err) => {
      console.log(err);
    });
  }

  canceladdEdit() {
    this.router.navigate(['/app/tasks']);
  }

  gotoLastPage() {
    this.router.navigate([`/app/tasks`]);
  }

  onSubmit() {
    if (this.isEditPage) {
      this.editTask();
    } else {
      this.addTask();
    }
  }

  addTask() {
    if (this.addEditForm.invalid) { return; }
    const datePipe = new DatePipe('en-US');
    const data = this.addEditForm.value;
    data.due_date = datePipe.transform(data.due_date, 'yyyy-MM-dd hh:mm:ss');

    const formdata = new FormData();
    formdata.append("message", data.message);
    formdata.append("due_date", data.due_date);
    formdata.append("priority", data.priority);
    formdata.append("assigned_to", data.assigned_to);

    this.tasksService.createTask(formdata).subscribe(res => {
      // console.log(res);
      if (res.status === 'error') {
        this.toastrService.error(res.error, `Error`, {
          timeOut: 7000,
        });
      } else {
        this.toastrService.success(`Added Successfully`, `Success`, {
          timeOut: 7000,
        });
        this.router.navigate(['/app/tasks']);
      }
    }, (err) => {
      this.toastrService.error(err.response.Message, `Error`, {
        timeOut: 7000,
      });
    });
  }

  editTask() {
    if (this.addEditForm.invalid) { return; }

    const data = this.addEditForm.value;
    // data.projectID = this.gd.editSystem.PROJECT_ID;
    // console.log(data);

    this.tasksService.updateTask(data).subscribe(res => {
      // console.log(res);
      this.toastrService.success(`Updated Successfully`, `Success`, {
        timeOut: 7000,
      });
      this.router.navigate(['/app/tasks']);
    }, (err) => {
      this.toastrService.error(err.response.Message, `Error`, {
        timeOut: 7000,
      });
      this.router.navigate(['/app/tasks']);
    });
  }

}
