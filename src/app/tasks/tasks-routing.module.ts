import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';

import { TasksComponent } from './tasks.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'create', component: AddEditTaskComponent },
  { path: 'edit', component: AddEditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
