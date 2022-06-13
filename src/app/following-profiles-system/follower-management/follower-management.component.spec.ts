import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerManagementComponent } from './follower-management.component';

describe('FollowerManagementComponent', () => {
  let component: FollowerManagementComponent;
  let fixture: ComponentFixture<FollowerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
