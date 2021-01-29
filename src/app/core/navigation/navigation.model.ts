import { SUB_ADMIN, UVT_ADMIN } from './../../app.constants';
import { ConfirmModalService } from './../confirm-modal/confirm-modal.service';
import { MenuItem } from 'src/app/model/menu-item';
import { SUPER_USER } from 'src/app/app.constants';
import { Router } from '@angular/router';
import { GlobalDataService } from '../services/global-data.service';
import { NavigationService } from './navigation.service';

export interface INavigation {
    menus: Array<MenuItem>;
}
export class NavigationModel implements INavigation {
    menus: Array<MenuItem>;
    constructor(
        private router: Router,
        private confirmDialogService: ConfirmModalService,
        private globalDataService: GlobalDataService,
        private navbarService: NavigationService,
    ) {
        this.menus = [
            {
                id: 'home',
                text: 'Home',
                icon: 'assets/images/account.svg',
                route: 'home',
                type: 'collapse',
                active: false,
                roles: [...SUPER_USER, ...SUB_ADMIN],
                submenu: null,
            },
            {
                id: 'logout',
                text: 'Logout',
                icon: 'assets/images/logout.svg',
                route: null,
                type: 'collapse',
                active: false,
                roles: [...SUPER_USER, ...SUB_ADMIN, ...UVT_ADMIN],
                submenu: null,
                function: () => {
                    const dialogOpts = { title: 'Confirm Dialog', message: 'Are you sure you want to logout ?' };
                    this.confirmDialogService.openDialogModal(dialogOpts)
                        .subscribe(res => {
                            if (res) {
                                const requestBody = JSON.stringify({
                                    username: this.globalDataService.currentUser.username
                                });

                                this.globalDataService.currentUser.token = '';
                                sessionStorage.clear();
                                this.globalDataService.reset();
                                this.router.navigate(['/login']);

                            }
                        });
                    return {};
                },
            },
        ];
    }
}
