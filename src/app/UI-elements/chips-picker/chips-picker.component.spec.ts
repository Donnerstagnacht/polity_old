import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsPickerComponent } from './chips-picker.component';

describe('ChipsPickerComponent', () => {
  let component: ChipsPickerComponent;
  let fixture: ComponentFixture<ChipsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
