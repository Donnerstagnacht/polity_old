import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipGroupManagementComponent } from './membership-group-management.component';

describe('MembershipGroupManagementComponent', () => {
  let component: MembershipGroupManagementComponent;
  let fixture: ComponentFixture<MembershipGroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipGroupManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
