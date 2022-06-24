import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipUserManagementComponent } from './membership-user-management.component';

describe('MembershipUserManagementComponent', () => {
  let component: MembershipUserManagementComponent;
  let fixture: ComponentFixture<MembershipUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipUserManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
