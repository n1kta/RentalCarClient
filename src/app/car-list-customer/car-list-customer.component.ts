import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list-customer',
  templateUrl: './car-list-customer.component.html',
  styleUrls: ['./car-list-customer.component.css']
})
export class CarListCustomerComponent implements OnInit {
  public dropOffDate = '';
  public pickUpDate = '';

  public cars: Car[] = [];

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async param => {
      const obj = {} as any;
      if (param && param['dropOffDate'] && param['pickUpDate']) {
        this.dropOffDate = param['dropOffDate'];
        this.pickUpDate = param['pickUpDate'];
        obj['dropOffDate'] = new Date(param['dropOffDate']);
        obj['pickUpDate'] = new Date(param['pickUpDate']);
      }
      
      this.cars = await this.carService.getAvailable(obj) as Car[];
    });
  }
}
