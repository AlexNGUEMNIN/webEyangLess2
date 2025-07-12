import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueCiteComponent } from './statistique-cite.component';

describe('StatistiqueCiteComponent', () => {
  let component: StatistiqueCiteComponent;
  let fixture: ComponentFixture<StatistiqueCiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistiqueCiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistiqueCiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
