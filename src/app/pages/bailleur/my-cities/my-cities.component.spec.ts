import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCitiesComponent } from './my-cities.component';

describe('MyCitiesComponent', () => {
  let component: MyCitiesComponent;
  let fixture: ComponentFixture<MyCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
