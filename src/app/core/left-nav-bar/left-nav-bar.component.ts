import { CurrentUser } from 'src/app/model/current-user';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalDataService } from '../services/global-data.service';
import { Observable } from 'rxjs';

declare const $: any;

declare var sideBtnClick: any;

@Component({
  selector: 'app-left-nav-bar',
  templateUrl: './left-nav-bar.component.html',
  styleUrls: ['./left-nav-bar.component.scss']
})

export class LeftNavBarComponent implements OnInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private gd: GlobalDataService,
  ) { }
  loggedusername: string;
  currentUSer: string;

  currentUserName: string;
  loggedInUser: string;
  lastLogin: Date;
  imageselected: any;
  hosName: any;
  @ViewChild('appSettings', { static: false }) appSettingsRef: ElementRef;

  profileImage = 'assets/images/app-logo.png';

  @HostListener('window:beforeunload')
  onBeforeUnload(): Observable<boolean> | boolean {

    sessionStorage.setItem('currentUser', JSON.stringify(this.gd.currentUser));
    const taskToEdit = this.gd.taskToEdit
      ? sessionStorage.setItem('taskToEdit', JSON.stringify(this.gd.taskToEdit)) : null;
    return true;
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    try {
      if (sessionStorage.getItem('currentUser')) {
        const localData = sessionStorage.getItem('currentUser');
        if (!!localData) {
          this.gd.taskToEdit = JSON.parse(sessionStorage.getItem('taskToEdit'));

          // Remove details from sessionStorage
          sessionStorage.removeItem('uniqueLogged');
        }
      }
    }
    catch (e) {
    }
  }

  navBtnClickEvent($event) {
    const st = new sideBtnClick($event);
  }

  logout() {
    const dialogOpts = { title: 'Confirm Dialog', message: 'Are you sure you want to logout ?' };
  }

  public changePass(event) {
    this.renderer.removeClass(this.appSettingsRef.nativeElement, 'active');
    this.renderer.addClass(event.target, 'active');
  }

  ngOnDestroy() {
    sessionStorage.removeItem('currentMenu');
  }

}
