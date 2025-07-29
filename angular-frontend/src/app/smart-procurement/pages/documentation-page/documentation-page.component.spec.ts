import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationPageComponent } from './documentation-page.component';

describe('DocumentationPageComponent', () => {
  let component: DocumentationPageComponent;
  let fixture: ComponentFixture<DocumentationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentationPageComponent]
    });
    fixture = TestBed.createComponent(DocumentationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
