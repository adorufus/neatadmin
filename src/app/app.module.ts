import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './components/auth/auth.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatTreeModule } from '@angular/material/tree'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { UsersComponent } from './components/users/users.component';
import { FloorManagerComponent } from './components/floor-manager/floor-manager.component';
import { ProofImageComponent } from './components/proof-image/proof-image.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WorkDataComponent } from './components/work-data/work-data.component';
import { CreateFloorComponent } from './components/dialog/create-floor/create-floor.component';
import { CreateAreaComponent } from './components/dialog/create-area/create-area.component';
import { CreateChecklistComponent } from './components/dialog/create-checklist/create-checklist.component';
import { FormsModule } from '@angular/forms';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { InviteCodeInputComponent } from './components/dialog/invite-code-input/invite-code-input.component';
import { LoginUsernameComponent } from './components/dialog/login-username/login-username.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ProofImageDialogComponent } from './components/dialog/proof-image/proof-image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    DashboardComponent,
    SidenavComponent,
    UsersComponent,
    FloorManagerComponent,
    ProofImageComponent,
    WorkDataComponent,
    CreateFloorComponent,
    CreateAreaComponent,
    CreateChecklistComponent,
    GeneralSettingsComponent,
    InviteCodeInputComponent,
    LoginUsernameComponent,
    ProofImageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTreeModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthGuard, DatePipe, NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
