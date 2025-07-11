import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCiteComponent } from './card-cite.component';

describe('CardCiteComponent', () => {
  let component: CardCiteComponent;
  let fixture: ComponentFixture<CardCiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});