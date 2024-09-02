import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyndicSpaceComponent } from './syndic-space.component';

describe('SyndicSpaceComponent', () => {
  let component: SyndicSpaceComponent;
  let fixture: ComponentFixture<SyndicSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SyndicSpaceComponent]
    });
    fixture = TestBed.createComponent(SyndicSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
