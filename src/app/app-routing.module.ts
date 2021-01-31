import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticComponent } from './authentic/authentic.component';
import { AuthGuardService } from './core/services/guards/auth-guard.service';
import { AuthenticDeactivateGuard } from './core/services/guards/authentic-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },


  {
    path: 'app', component: AuthenticComponent,
    canActivate: [AuthGuardService], canActivateChild: [AuthGuardService],
    canDeactivate: [AuthenticDeactivateGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    ]
  },

  { path: '401', component: UnauthorizedComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
