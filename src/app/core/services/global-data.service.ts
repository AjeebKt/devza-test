import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CurrentUser } from 'src/app/model/current-user';
import { PriceList } from 'src/app/model/priceList';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  currentSubOpConfig: any;
  currentUser: CurrentUser = new CurrentUser();
  currentMenu: string;
  tempId;
  roleStatus: any;
  responseIdToEdit: { id: number, page: number };
  subOperatorIdToEdit: { id: number, page: number };
  private userIdPatient = new BehaviorSubject(null);
  currentuserIdPatient = this.userIdPatient.asObservable();
  focusChange = new Subject();

  constructor() { }
  reset() {

    this.currentUser = new CurrentUser();
    this.roleStatus = false;
  }
  changeId(id: number) {
    this.tempId = id;
    this.userIdPatient.next(id);
  }
}
