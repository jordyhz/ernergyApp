import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricOperationsComponent } from './metric-operations.component';

describe('MetricOperationsComponent', () => {
  let component: MetricOperationsComponent;
  let fixture: ComponentFixture<MetricOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
