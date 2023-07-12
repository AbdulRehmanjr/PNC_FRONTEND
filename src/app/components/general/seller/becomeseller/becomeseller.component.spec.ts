import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomesellerComponent } from './becomeseller.component';

describe('BecomesellerComponent', () => {
  let component: BecomesellerComponent;
  let fixture: ComponentFixture<BecomesellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BecomesellerComponent]
    });
    fixture = TestBed.createComponent(BecomesellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
