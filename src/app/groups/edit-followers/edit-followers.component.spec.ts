import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFollowersComponent } from './edit-followers.component';

describe('EditFollowersComponent', () => {
  let component: EditFollowersComponent;
  let fixture: ComponentFixture<EditFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFollowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
