import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Summary01Component } from './summary01.component';

describe('Summary01Component', () => {
  let component: Summary01Component;
  let fixture: ComponentFixture<Summary01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Summary01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Summary01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
