import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public invalidLoginMessage: boolean = false;

  public email: string = '';
  public password: string = '';

  constructor(private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public async login() {
    if (!this.email || !this.password) return;
    if (!this.validateEmail(this.email)) return;

    const credentials = {
      'email': this.email,
      'password': this.password
    };

    try {
      const result = await this.authenticationService.logIn(credentials) as any;
      if (result && result.isAuthenticated) {
        const token = (<any>result).token;
        localStorage.setItem("token", token);

        let isAdmin = ((<any>result).roles as string).toLowerCase() === 'admin';

        if (isAdmin) {
          this.router.navigate(["admin"]);
        } else {
          this.router.navigate(["/"]);
        }
      } else {
        this.invalidLoginMessage = true;
      }
    } catch (e) {
      this.invalidLoginMessage = true;
    }
  }

  private validateEmail(str: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(str);
  }
}
