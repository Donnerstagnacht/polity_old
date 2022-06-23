import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabViewTableListsComponent } from './tab-view-table-lists.component';

describe('TabViewTableListsComponent', () => {
  let component: TabViewTableListsComponent;
  let fixture: ComponentFixture<TabViewTableListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabViewTableListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabViewTableListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
