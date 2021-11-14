import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public rentals: Rental[] = [];

  constructor(private rentalService: RentalService) { }

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

    this.rentals = (await this.rentalService.getAll()) as Rental[];
    this.dtTrigger.next(this.rentals);
  }
}
