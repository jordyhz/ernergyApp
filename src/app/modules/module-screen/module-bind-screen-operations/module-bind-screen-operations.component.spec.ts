import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBindScreenOperationsComponent } from './module-bind-screen-operations.component';

describe('ModuleBindScreenOperationsComponent', () => {
  let component: ModuleBindScreenOperationsComponent;
  let fixture: ComponentFixture<ModuleBindScreenOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleBindScreenOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleBindScreenOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
