import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCitiesComponent } from './details-cities.component';

describe('DetailsCitiesComponent', () => {
  let component: DetailsCitiesComponent;
  let fixture: ComponentFixture<DetailsCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
