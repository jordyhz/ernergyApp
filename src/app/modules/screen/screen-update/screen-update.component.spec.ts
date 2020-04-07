import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenUpdateComponent } from './screen-update.component';

describe('ScreenUpdateComponent', () => {
  let component: ScreenUpdateComponent;
  let fixture: ComponentFixture<ScreenUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
