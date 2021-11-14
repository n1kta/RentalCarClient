import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/car';
import { Customer } from '../models/customer';
import { ReturnCreate } from '../models/rentalCreate';
import { AuthenticationService } from '../services/authentication.service';
import { CarService } from '../services/car.service';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-car-details-customer',
  templateUrl: './car-details-customer.component.html',
  styleUrls: ['./car-details-customer.component.css']
})
export class CarDetailsCustomerComponent implements OnInit {
  public car: Car = {} as Car;
  public return: ReturnCreate = {} as ReturnCreate;

  public model: any = {
    carId: null,
    customerId: null,
    pickUpDate: null,
    dropOffDate: null,
    pickUpLoc: '',
    dropOffLoc: '',
    fee: null
  }

  constructor(private carService: CarService,
    private authenticationService: AuthenticationService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    if (localStorage.getItem('token')) {
      try {
        const customer = await this.authenticationService.getCurrentCustomer() as Customer;
        this.model.customerId = customer.id;
      }
      catch(e) {
        
      }
    }

    this.activatedRoute.paramMap.subscribe(async (param: any) => {
      const id = +param['params']['id'];
      try {
        this.car = await this.carService.getById(id) as Car;
        this.model.carId = id;
      } catch (e) {
      }
    });

    this.activatedRoute.queryParams.subscribe(param => {
      if (param && param['dropOffDate'] && param['pickUpDate']) {
        this.model.dropOffDate = param['dropOffDate'];
        this.model.pickUpDate = param['pickUpDate'];
      }
    })
  }

  public calcPrice(pickUpDate: any, dropOffDate: any) {
    if (pickUpDate && dropOffDate) {
      if (pickUpDate === dropOffDate) {
        this.model.fee = 0;
        return 0;
      }

      const diffTime = Math.abs((new Date(dropOffDate) as any) - (new Date(pickUpDate) as any));
      const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      this.model.fee = Math.round(this.car.pricePerHour * diffDay * 100) / 100;
      return Math.round(this.car.pricePerHour * diffDay * 100) / 100;
    } else {
      this.model.fee = 0;
      return 0;
    }
  }

  async rent() {
    if (this.model && this.model.carId &&
      this.model.customerId &&
      this.model.pickUpDate &&
      this.model.dropOffDate &&
      this.model.pickUpLoc &&
      this.model.dropOffLoc) {
        await this.rentalService.create(this.model);
        this.router.navigate(['returns']);
    }
  }
}
