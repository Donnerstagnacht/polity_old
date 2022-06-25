import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiHeaderComponent } from './wiki-header.component';

describe('WikiHeaderComponent', () => {
  let component: WikiHeaderComponent;
  let fixture: ComponentFixture<WikiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WikiHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WikiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
