import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmMailComponent } from './alarm-mail.component';

describe('AlarmMailComponent', () => {
  let component: AlarmMailComponent;
  let fixture: ComponentFixture<AlarmMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
