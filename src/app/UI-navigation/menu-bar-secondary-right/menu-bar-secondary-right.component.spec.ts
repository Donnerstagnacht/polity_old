import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarSecondaryRightComponent } from './menu-bar-secondary-right.component';

describe('MenuBarSecondaryRightComponent', () => {
  let component: MenuBarSecondaryRightComponent;
  let fixture: ComponentFixture<MenuBarSecondaryRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBarSecondaryRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarSecondaryRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
