import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit{
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public cars: Car[] = [];
  public car: Car = {} as Car;
  public cloneCar: Car = {} as Car;
  public newCar: Car = {} as Car;

  constructor(private carService: CarService,
    private modalService: NgbModal
  ) { }

  async ngOnInit() {
    this.dtOptions = {
      destroy: true,
      pagingType: "full_numbers",
      pageLength: 10,
      paging: true,
      searching: false,
      responsive: true,
      ordering: false,
      language: {
        "lengthMenu": 'Показати _MENU_ записів',
        "info": 'Показувати _PAGE_ з _PAGES_',
        "search": 'Пошук',
        "paginate": {
          "first": 'Перший',
          "last": 'Останній',
          "previous": 'Назад',
          "next": 'Вперід'
        }
      }
    };
    this.cars = (await this.carService.getAll()) as Car[];
    this.dtTrigger.next(this.cars);
  }

  openUpdate(paramCar: any, contentUpdate: any) {
    this.car = { ...paramCar };
    this.cloneCar = { ...paramCar };
    this.modalService.open(contentUpdate, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => {
      this.car = this.cloneCar;
    });
  }

  async save(modal: any) {
    modal.close('Save click');
    try {
      await this.carService.update(this.car.id, this.car);
      this.cars = (await this.carService.getAll()) as Car[];
    } catch (e) {

    }
  }

  openDelete(paramCar: any, contentDelete: any) {
    this.car = { ...paramCar };
    this.modalService.open(contentDelete, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
  }

  async answear(modal: any, shoudlDelete: boolean) {
    if (shoudlDelete) {
      try {
        await this.carService.delete(this.car.id);
        this.cars = (await this.carService.getAll()) as Car[];
        modal.close('');
      } catch (e) {

      }
    } else {
      modal.close('');
    }
  }

  openCreate(contentCreate: any) {
    this.modalService.open(contentCreate, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
  }

  async create(modal: any) {
    if (this.newCar && this.newCar.brand &&
      this.newCar.model && this.newCar.year &&
      this.newCar.pricePerHour && this.newCar.fuel) {
      try {
        await this.carService.create(this.newCar);
        this.cars = (await this.carService.getAll()) as Car[];
        modal.dismiss('');
        this.newCar = {} as Car;
      } catch (e) {

      }
    }
  }
}
