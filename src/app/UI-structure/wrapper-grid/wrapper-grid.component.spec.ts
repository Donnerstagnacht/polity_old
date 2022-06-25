import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperGridComponent } from './wrapper-grid.component';

describe('WrapperGridComponent', () => {
  let component: WrapperGridComponent;
  let fixture: ComponentFixture<WrapperGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
