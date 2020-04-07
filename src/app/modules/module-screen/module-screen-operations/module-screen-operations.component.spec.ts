import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleScreenOperationsComponent } from './module-screen-operations.component';

describe('ModuleScreenOperationsComponent', () => {
  let component: ModuleScreenOperationsComponent;
  let fixture: ComponentFixture<ModuleScreenOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleScreenOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleScreenOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
