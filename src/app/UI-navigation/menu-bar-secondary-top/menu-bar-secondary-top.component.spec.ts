import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarSecondaryTopComponent } from './menu-bar-secondary-top.component';

describe('MenuBarSecondaryTopComponent', () => {
  let component: MenuBarSecondaryTopComponent;
  let fixture: ComponentFixture<MenuBarSecondaryTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBarSecondaryTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarSecondaryTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
