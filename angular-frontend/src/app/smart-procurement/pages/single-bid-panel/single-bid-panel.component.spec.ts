import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBidPanelComponent } from './single-bid-panel.component';

describe('SingleBidPanelComponent', () => {
  let component: SingleBidPanelComponent;
  let fixture: ComponentFixture<SingleBidPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBidPanelComponent]
    });
    fixture = TestBed.createComponent(SingleBidPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
