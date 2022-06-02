import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperFullCreenCenterComponent } from './wrapper-full-creen-center.component';

describe('WrapperFullCreenCenterComponent', () => {
  let component: WrapperFullCreenCenterComponent;
  let fixture: ComponentFixture<WrapperFullCreenCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperFullCreenCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperFullCreenCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
