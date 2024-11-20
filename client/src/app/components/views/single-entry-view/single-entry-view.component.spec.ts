import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEntryViewComponent } from './single-entry-view.component';

describe('SingleEntryViewComponent', () => {
  let component: SingleEntryViewComponent;
  let fixture: ComponentFixture<SingleEntryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleEntryViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
