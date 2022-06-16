import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroupsListComponent } from './my-groups-list.component';

describe('MyGroupsListComponent', () => {
  let component: MyGroupsListComponent;
  let fixture: ComponentFixture<MyGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGroupsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
