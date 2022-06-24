import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerGroupManagementComponent } from './follower-group-management.component';

describe('FollowerGroupManagementComponent', () => {
  let component: FollowerGroupManagementComponent;
  let fixture: ComponentFixture<FollowerGroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowerGroupManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
