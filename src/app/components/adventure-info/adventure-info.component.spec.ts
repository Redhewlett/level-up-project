import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureInfoComponent } from './adventure-info.component';

describe('AdventureInfoComponent', () => {
  let component: AdventureInfoComponent;
  let fixture: ComponentFixture<AdventureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdventureInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdventureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
