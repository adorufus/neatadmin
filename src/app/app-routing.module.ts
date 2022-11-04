import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FloorManagerComponent } from './components/floor-manager/floor-manager.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { ProofImageComponent } from './components/proof-image/proof-image.component';
import { UsersComponent } from './components/users/users.component';
import { WorkDataComponent } from './components/work-data/work-data.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "home",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full'
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "floors",
    component: FloorManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "proofs",
    component: ProofImageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "works",
    component: WorkDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "general",
    component: GeneralSettingsComponent,
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
