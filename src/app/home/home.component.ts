import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'underscore';
import { ConfirmModalService } from '../core/confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  configForm: FormGroup;
  components: FormArray;

  constructor(
    private confirmDialogService: ConfirmModalService,
    private fb: FormBuilder,
    private hs: HomeService
  ) {
  }

  ngOnInit() {
    // this.hs.getUserList().subscribe(res => {
    //   console.log(res);
    // }, (err) => {
    //   console.log(err);
    // });
  }

}
