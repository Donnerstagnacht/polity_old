import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineOfListComponent } from './headline-of-list.component';

describe('HeadlineOfListComponent', () => {
  let component: HeadlineOfListComponent;
  let fixture: ComponentFixture<HeadlineOfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadlineOfListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadlineOfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
