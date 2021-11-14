import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public pickUpDate: string = '';
  public dropOffDate: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchCars() {
    if (this.pickUpDate < this.dropOffDate) {
      this.router.navigate(['cars'], { queryParams: { 'pickUpDate': this.pickUpDate, 'dropOffDate': this.dropOffDate } });
    }
  }
}
