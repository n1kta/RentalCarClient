import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public invalidLoginMessage: boolean = false;

  public email: string = '';
  public password: string = '';
  public repeatPass: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public address: string = '';
  public phone: string = '';

  constructor(private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public async registration() {
    if (!this.email || !this.password || !this.repeatPass || !this.firstName || !this.lastName || !this.address || !this.phone) return;
    if (!this.validateEmail(this.email)) return;
    if (this.password !== this.repeatPass) return;

    const credentials = {
      'email': this.email,
      'password': this.password,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'address': this.address,
      'phone': this.phone
    };

    try {
      const response = await this.authenticationService.registration(credentials) as any;
      if (response.isSuccess) {
        this.router.navigate(['login']);
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
