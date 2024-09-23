import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerFilteringComponent } from './seller-filtering.component';

describe('SellerFilteringComponent', () => {
  let component: SellerFilteringComponent;
  let fixture: ComponentFixture<SellerFilteringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerFilteringComponent]
    });
    fixture = TestBed.createComponent(SellerFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
