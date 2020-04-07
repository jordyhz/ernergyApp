import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleScreenListComponent } from './module-screen-list.component';

describe('ModuleScreenListComponent', () => {
  let component: ModuleScreenListComponent;
  let fixture: ComponentFixture<ModuleScreenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleScreenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
