import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeBailleurComponent } from './become-bailleur.component';

describe('BecomeBailleurComponent', () => {
  let component: BecomeBailleurComponent;
  let fixture: ComponentFixture<BecomeBailleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BecomeBailleurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BecomeBailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
