import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarLeftComponent } from './menu-bar-left.component';

describe('MenuBarLeftComponent', () => {
  let component: MenuBarLeftComponent;
  let fixture: ComponentFixture<MenuBarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBarLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
