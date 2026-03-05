import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Nav } from './nav/nav';
import { Profile } from './profile/profile';
import { Sidenav } from './sidenav/sidenav';
import { Signup } from './signup/signup';

export const routes: Routes = [
{ path: '', component: Sidenav },
{path:'dashboard',component:Dashboard},
{ path: 'nav', component: Nav },
{ path: 'login', component: Login },
{ path: 'profile', component: Profile},
{path: 'sidebar',component:Sidenav},
{path: 'signup',component:Signup},




];
