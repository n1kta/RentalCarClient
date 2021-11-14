import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public customers: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  async ngOnInit() {
    this.dtOptions = {
      destroy: true,
      pagingType: "full_numbers",
      pageLength: 100,
      paging: true,
      searching: false,
      responsive: true,
      ordering: true,
    };

    this.customers = (await this.customerService.getAll()) as Customer[];
    this.dtTrigger.next(this.customers);
  }
}
