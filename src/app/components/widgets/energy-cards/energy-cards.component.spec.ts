import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyCardsComponent } from './energy-cards.component';

describe('EnergyCardsComponent', () => {
  let component: EnergyCardsComponent;
  let fixture: ComponentFixture<EnergyCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
