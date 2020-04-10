import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentTableComponent} from './tournament-table/tournament-table.component';
import { MyAchievementsComponent} from './my-achievements/my-achievements.component';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent} from './profile/profile.component';
const routes: Routes = [
  {path:'tournament-table',component:TournamentTableComponent},
  {path:"my-achievements",component:MyAchievementsComponent},
  {path:"add-tournament",component:AddTournamentComponent},
  {path:"settings",component:SettingsComponent},
  {path:"profile",component:ProfileComponent},
  { path: '**', redirectTo: 'settings', pathMatch: 'full'}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
