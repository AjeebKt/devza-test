import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalDataService } from '../services/global-data.service';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="delete right-page-btns">
      <img src="./assets/images/icon2.PNG" alt="delete">
      <p>{{ message }}</p>
      <button
        type="button"
        class="btn btn-default "
        style=""
        (click)="dialogRef.close(false)"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger "
        appAutofocus
        (click)="dialogRef.close(true)"
      >
        Confirm
      </button>

    </div>
  `,
  styles: [
    `
    img {
      margin-top: 25px;
      margin-bottom: 45px;
      max-width: 100%;
    }
    .delete {
      text-align: center;
      width: 380px;
      max-width: 100%;
    }
    p {
    text-align: center;
    margin-bottom: 30px;
    font-size: 20px;
}
button{
    box-shadow: none !important;
    font-size: 13px;
}
.doneClr{
  float:right;
    /* border: none !important; */
}

.cancelClr:hover{
    background-color: #fff !important;
}

  }`
  ]
})
export class ConfirmModalComponent implements OnInit {
  public title: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    private globalDatService: GlobalDataService
  ) { }
  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(() => {
      this.globalDatService.focusChange.next();
    });
  }
}
