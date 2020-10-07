import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router //private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.loginRequestPayload.email = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        console.log('data');

        console.log(data);
        this.isError = false;
        //this.router.navigateByUrl('');
        //this.toastr.success('Login Successful');
      },
      (error) => {
        console.log('error');

        console.log(error);

        this.isError = true;
        // throwError(error);
      }
    );
  }
}
