import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenOperationsComponent } from './screen-operations.component';

describe('ScreenOperationsComponent', () => {
  let component: ScreenOperationsComponent;
  let fixture: ComponentFixture<ScreenOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
