import { Component, OnInit } from '@angular/core';
import { BearerToken } from '../models/account/BearerToken';
import { PlayerForLogin } from '../models/account/PlayerForLogin';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  public userLoginForm: FormGroup;

  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialog:MatDialog
    ) { }

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';

  }

  login() {
    const userLogin: PlayerForLogin = {
      ...this.userLoginForm.value
    };
    this.accountService.login(userLogin)
      .subscribe((bearerToken: BearerToken) => {
        localStorage.setItem('accessToken', bearerToken.accessToken);
        this.router.navigate([this.returnUrl]);
      });

  }

  openRegisterDialog(){
    this.dialog.open(RegisterDialogComponent,{
      width: '600px',
      height: '450px',
    });
  }

}

