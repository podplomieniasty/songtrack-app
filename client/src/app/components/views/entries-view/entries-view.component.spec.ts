import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesViewComponent } from './entries-view.component';

describe('EntriesViewComponent', () => {
  let component: EntriesViewComponent;
  let fixture: ComponentFixture<EntriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
