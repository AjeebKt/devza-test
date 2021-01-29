import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './core/services/progress-bar.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code-test';
  showLoader: boolean;

  constructor(
    private progressbarService: ProgressBarService,
    // private confirmDialogService: ConfirmModalService,
    // private globalDataService: GlobalDataService,
    // private router: Router,
    // private navigationService: NavigationService
  ) {

    // this.navigationService.setNavigationModel(new NavigationModel(router, confirmDialogService, globalDataService, navigationService));

  }
  ngOnInit() {

    this.progressbarService.status.pipe(debounceTime(200), distinctUntilChanged()).subscribe((val: boolean) => {
      this.showLoader = val;
    });

  }
}
