import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerrequestsComponent } from './sellerrequests.component';

describe('SellerrequestsComponent', () => {
  let component: SellerrequestsComponent;
  let fixture: ComponentFixture<SellerrequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerrequestsComponent]
    });
    fixture = TestBed.createComponent(SellerrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
