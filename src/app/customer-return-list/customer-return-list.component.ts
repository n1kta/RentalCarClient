import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthenticationService } from '../services/authentication.service';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-customer-return-list',
  templateUrl: './customer-return-list.component.html',
  styleUrls: ['./customer-return-list.component.css']
})
export class CustomerReturnListComponent implements OnInit {
  public model: any = {
    carId: null
  }

  rentals: any = [];

  constructor(private authenticationService: AuthenticationService,
    private rentalService: RentalService
  ) { }

  async ngOnInit() {
    if (localStorage.getItem('token')) {
      const customer = await this.authenticationService.getCurrentCustomer() as Customer;
      this.model.customerId = customer.id;
      this.rentals = await this.rentalService.getByCustomerId(customer.id) as [];
    }
  }

  async returnRental(rentalId: number) {
    try {
      await this.rentalService.returnRental(rentalId);
      this.rentals = await this.rentalService.getByCustomerId(this.model.customerId) as [];
    }
    catch(e) {
      console.log(e);
    }
  }
}
