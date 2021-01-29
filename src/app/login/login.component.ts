import { Component, OnInit, Renderer2 } from '@angular/core';
import { LoginService } from './login.service';
import { SUPER_USER, UVT_ADMIN, SUB_ADMIN } from '../app.constants';
import { LoginResponse } from '../model/login-response';
import { GlobalDataService } from '../core/services/global-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../core/services/response.interceptor';
import { ErroMessage as ErrorMessage } from '../model/error-message.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { CurrentUser } from '../model/current-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  loginForm: FormGroup;

  constructor(
    private globalDataService: GlobalDataService,
    private loginSevice: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.loginForm = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  login() {
    const data = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };
    this.loginSevice.login(data).subscribe(response => {
      const loginResponse = new LoginResponse();
      const tokenResponse = response;
      loginResponse.role = 'SUPER_USER';
      loginResponse.token = tokenResponse.token;

      const currentUser = this.globalDataService.currentUser = new CurrentUser(loginResponse);
      this.router.navigate(['/app/home']);
    }, (error: HttpErrorResponse | ErrorResponse) => {
      if (error instanceof ErrorResponse) {
        if (error.message === 'INVALID USER') {
          this.router.navigate(['/401']);
        } else {
          this.submitted = true;
          let formError = null;
          switch (error.message) {
            case ErrorMessage.INVALIDUSER_CREDS:
              formError = { invalidCreds: { message: error.message } };
              break;
            case ErrorMessage.BAD_CREDENTIALS:
              formError = { invalidCreds: { message: ErrorMessage.INVALIDUSER_CREDS } };
              break;
            case ErrorMessage.DELETED_USER:
              formError = { deletedUser: { message: error.message } };
              break;
            case ErrorMessage.UNKNOWN_USERNAME:
              this.loginForm.controls.username.setErrors({ inactiveUser: { message: ErrorMessage.UNKNOWN_USERNAME } });
              break;
            case ErrorMessage.INACTIVE_USER:
              this.loginForm.controls.username.setErrors({ inactiveUser: { message: ErrorMessage.INACTIVE_USER } });
              break;
            case ErrorMessage.BLOCKED_USER:
              formError = { invalidCreds: { message: 'User blocked.please contact your administrator' } };
              break;
          }
          this.loginForm.setErrors(formError);
        }
      }
    });
  }

}
