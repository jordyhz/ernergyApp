import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiOperationsComponent } from './kpi-operations.component';

describe('KpiOperationsComponent', () => {
  let component: KpiOperationsComponent;
  let fixture: ComponentFixture<KpiOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
