import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsOverlayComponent } from './actions-overlay.component';

describe('ActionsOverlayComponent', () => {
  let component: ActionsOverlayComponent;
  let fixture: ComponentFixture<ActionsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
