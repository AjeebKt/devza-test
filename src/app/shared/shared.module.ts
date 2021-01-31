import { AutoFocusDirective } from './directives/auto-focus.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';


// import {
//   MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatTableModule,
//   MatDialogModule, MatSlideToggleModule, MatSelectModule, MatInputModule, MatCheckboxModule,
//   MatNativeDateModule, MatDatepickerModule, MatSnackBarModule, MatProgressBarModule,
//   MatChipsModule, MatTooltipModule, MatRadioModule
// } from '@angular/material';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { IntlTelInputComponent } from './intl-tel-input/intl-tel-input.component';
import { PhoneNumberDirective } from './directives/phone-number.directive';
import { SpaceRemoverDirective } from './directives/space-remover.directive';
import { ShowErrorsComponent } from './show-errors/show-errors.component';
import { EmailValidatorDirective } from './custom-validator/email-validator';
import { SpecialCharacterRemoverDirective } from './directives/special-character-remover.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { ValidatorTriggerDirective } from './directives/validator-trigger.directive';
import { ButtonSubmitDirective } from './directives/button-submit.directive';
import { FloatNumberDirective } from './directives/float-number.directive';
import { DateInputDisableDirective } from './directives/date-input-disable.directive';
import { FocusOnErrorDirective } from './directives/focus-on-error.directive';
import { SearchPipe } from './pipes/search.pipe';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const MAT_MODULES = [
  MatRadioModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatChipsModule,
  DragDropModule,
  MatPaginatorModule,
  Ng2SearchPipeModule,
  MatTooltipModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
  // NgbModule
];
const pipes = [FilterPipe, SearchPipe ];
const components = [ShowErrorsComponent, CustomPaginationComponent,
  IntlTelInputComponent,
  EmailValidatorDirective];

const directives = [PhoneNumberDirective,
  AutoFocusDirective,
  DateInputDisableDirective, FocusOnErrorDirective,
  FloatNumberDirective,
  ValidatorTriggerDirective,
  ButtonSubmitDirective,
  SpaceRemoverDirective, SpecialCharacterRemoverDirective];

@NgModule({
  imports: [
    CommonModule,
    ...MAT_MODULES,

  ],
  exports: [
    CommonModule,
    ...MAT_MODULES,
    ...pipes,
    ...components,
    ...directives,
  ],
  declarations: [
    SharedComponent,
    ...pipes,
    ...components,
    ...directives
  ]
})

export class SharedModule { }
