import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCounterTileComponent } from './widget-counter-tile.component';

describe('WidgetCounterTileComponent', () => {
  let component: WidgetCounterTileComponent;
  let fixture: ComponentFixture<WidgetCounterTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetCounterTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetCounterTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
