import { Component, OnInit } from '@angular/core';
import { BearerToken } from '../models/account/BearerToken';
import { PlayerForLogin } from '../models/account/PlayerForLogin';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  private returnUrl: string;

  public userLoginForm: FormGroup;
  public errorText:string;

  constructor(private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar:MatSnackBar
  ) { }
  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tournament-table';

  }

  login() {
    const userLogin: PlayerForLogin = {
      ...this.userLoginForm.value
    };
    this.accountService.login(userLogin)
      .subscribe((bearerToken: BearerToken) => {
        localStorage.setItem('accessToken', bearerToken.accessToken);
        this.router.navigate([this.returnUrl]);
      },error=>{
        this.errorText =error;
        console.log(error);
        this.snackBar.open("Invalid Credentials",'',{
          duration:3000,
          verticalPosition:'top'
        })
        
      });

  }

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, {
      width: '600px',
      height: '650px',
    });
  }

}

