import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMonthsComponent } from './list-months.component';

describe('ListMonthsComponent', () => {
  let component: ListMonthsComponent;
  let fixture: ComponentFixture<ListMonthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMonthsComponent]
    });
    fixture = TestBed.createComponent(ListMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
