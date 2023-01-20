import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsPickerGenericComponent } from './chips-picker-generic.component';

describe('ChipsPickerGenericComponent', () => {
  let component: ChipsPickerGenericComponent;
  let fixture: ComponentFixture<ChipsPickerGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsPickerGenericComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsPickerGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
