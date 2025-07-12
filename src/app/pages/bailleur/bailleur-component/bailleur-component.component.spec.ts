import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BailleurComponentComponent } from './bailleur-component.component';

describe('BailleurComponentComponent', () => {
  let component: BailleurComponentComponent;
  let fixture: ComponentFixture<BailleurComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BailleurComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BailleurComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
