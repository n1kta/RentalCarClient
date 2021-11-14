import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Return } from 'src/app/models/return';
import { ReturnService } from 'src/app/services/return.service';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.css']
})
export class ReturnListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public returns: Return[] = [];

  constructor(private returService: ReturnService) { }

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

    this.returns = (await this.returService.getAll()) as Return[];
    this.dtTrigger.next(this.returns);
  }
}
