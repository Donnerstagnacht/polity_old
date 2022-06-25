import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarBottomComponent } from './menu-bar-bottom.component';

describe('MenuBarBottomComponent', () => {
  let component: MenuBarBottomComponent;
  let fixture: ComponentFixture<MenuBarBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBarBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
