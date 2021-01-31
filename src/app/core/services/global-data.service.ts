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
  taskToEdit: any;

  focusChange = new Subject();

  constructor() { }
  reset() {
    this.currentUser = new CurrentUser();
  }
}
