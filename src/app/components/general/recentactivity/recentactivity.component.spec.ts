import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentactivityComponent } from './recentactivity.component';

describe('RecentactivityComponent', () => {
  let component: RecentactivityComponent;
  let fixture: ComponentFixture<RecentactivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentactivityComponent]
    });
    fixture = TestBed.createComponent(RecentactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
