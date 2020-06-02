import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TournamentTableComponent } from './tournament-table/tournament-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MyAchievementsComponent } from './my-achievements/my-achievements.component';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule} from '@angular/material/grid-list';
import { AddTournamentDialogComponent } from './tournament-table/add-tournament-dialog/add-tournament-dialog.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PlayerCheckboxComponent } from './add-tournament/player-checkbox/player-checkbox.component';
import { EditTournamentComponent } from './edit-tournament/edit-tournament.component';
import { DeleteDialogComponent } from './tournament-table/delete-dialog/delete-dialog.component';
import { LoginComponent } from './login/login.component';
import { RegisterDialogComponent } from './login/register-dialog/register-dialog.component';
import { AuthGuard } from './guards/auth.guard';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PlayersTableComponent } from './players-table/players-table.component';
import { DeletePlayerDialogComponent } from './players-table/delete-player-dialog/delete-player-dialog.component';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { ViewTournamentComponent } from './view-tournament/view-tournament.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

let config = new AuthServiceConfig([
  {
     id: GoogleLoginProvider.PROVIDER_ID,
     provider: new GoogleLoginProvider("435504687783-jmg1heitefdgadc0r9svk92itrgi4581.apps.googleusercontent.com")
  }
]);
export function provideConfig()
 {
    return config;
 }


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TournamentTableComponent,
    MyAchievementsComponent,
    AddTournamentComponent,
    SettingsComponent,
    ProfileComponent,
    AddTournamentDialogComponent,
    PlayerCheckboxComponent,
    EditTournamentComponent,
    DeleteDialogComponent,
    LoginComponent,
    RegisterDialogComponent,
    PlayersTableComponent,
    DeletePlayerDialogComponent,
    ViewTournamentComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    HttpClientModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        whitelistedDomains: [environment.whitelistedDomainsForSendingToken],
        blacklistedRoutes: [environment.blacklistedRoutes]
   }}),
   SocialLoginModule.initialize(config)
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
