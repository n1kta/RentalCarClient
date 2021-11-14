import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsCustomerComponent } from './car-details-customer.component';

describe('CarDetailsCustomerComponent', () => {
  let component: CarDetailsCustomerComponent;
  let fixture: ComponentFixture<CarDetailsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailsCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
