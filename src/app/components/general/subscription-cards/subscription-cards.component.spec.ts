import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionCardsComponent } from './subscription-cards.component';

describe('SubscriptionCardsComponent', () => {
  let component: SubscriptionCardsComponent;
  let fixture: ComponentFixture<SubscriptionCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionCardsComponent]
    });
    fixture = TestBed.createComponent(SubscriptionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
