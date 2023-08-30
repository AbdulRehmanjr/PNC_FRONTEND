import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSideBarComponent } from './seller-side-bar.component';

describe('SellerSideBarComponent', () => {
  let component: SellerSideBarComponent;
  let fixture: ComponentFixture<SellerSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerSideBarComponent]
    });
    fixture = TestBed.createComponent(SellerSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
