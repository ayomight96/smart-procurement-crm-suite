import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchBidPanelComponent } from './batch-bid-panel.component';

describe('BatchBidPanelComponent', () => {
  let component: BatchBidPanelComponent;
  let fixture: ComponentFixture<BatchBidPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchBidPanelComponent]
    });
    fixture = TestBed.createComponent(BatchBidPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
