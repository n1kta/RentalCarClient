import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from './models/customer';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rentalCar-client';

  customer: Customer | null = {} as Customer | null;

  constructor(private authenticationService: AuthenticationService, private activeRoute: ActivatedRoute, private router: Router) {

  }

  async ngOnInit() {
    if (localStorage.getItem("token")) {
      try {
        this.customer = await this.authenticationService.getCurrentCustomer() as Customer;
        // this.activeRoute.params.subscribe(async routeParams => {
        //   debugger
        //   this.customer = await this.authenticationService.getCurrentCustomer() as Customer;
        // });
      }
      catch(e) {
        
      }
    } else {
      this.customer = null;
    }
  }

  logOut() {
    this.authenticationService.logOut();
    window.location.reload();
  }

  editCustomer() {
    this.router.navigate(['edit']);
  }
}
