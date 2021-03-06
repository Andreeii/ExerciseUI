import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentTableComponent } from './tournament-table/tournament-table.component';
import { MyAchievementsComponent } from './my-achievements/my-achievements.component';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { EditTournamentComponent } from './edit-tournament/edit-tournament.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AuthGuard } from './guards/auth.guard';
import { PlayersTableComponent } from './players-table/players-table.component';
import { ViewTournamentComponent } from './view-tournament/view-tournament.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'tournament-table', component: TournamentTableComponent },
      { path: "my-achievements", component: MyAchievementsComponent },
      { path: "add-tournament", component: AddTournamentComponent },
      { path: "edit-tournament", component:EditTournamentComponent},
      { path: "view-tournament", component:ViewTournamentComponent},
      { path: "settings", component: SettingsComponent },
      { path: "players-table", component: PlayersTableComponent },
      { path: "profile", component: ProfileComponent }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
