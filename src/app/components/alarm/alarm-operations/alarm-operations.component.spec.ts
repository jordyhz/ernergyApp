import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmOperationsComponent } from './alarm-operations.component';

describe('AlarmOperationsComponent', () => {
  let component: AlarmOperationsComponent;
  let fixture: ComponentFixture<AlarmOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
