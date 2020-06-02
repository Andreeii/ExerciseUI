import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TournamentPlayer } from '../services/player.service';


@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  imgUrl: string;

  name: string;
  surName: string;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private playerService: TournamentPlayer) { }

  ngOnInit(): void {
    this.playerService.getPlayer().subscribe(p => {
      this.name = p.name;
      this.surName = p.surname;
      this.imgUrl =  p.profileImage;
    })
  }

  onFileSelected(event) {
    console.log(event);
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['login']);
  }

}
