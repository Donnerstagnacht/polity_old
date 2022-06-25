import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAndContactComponent } from './about-and-contact.component';

describe('AboutAndContactComponent', () => {
  let component: AboutAndContactComponent;
  let fixture: ComponentFixture<AboutAndContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAndContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutAndContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
