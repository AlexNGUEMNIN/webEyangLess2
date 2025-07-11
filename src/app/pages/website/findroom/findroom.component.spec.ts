import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindroomComponent } from './findroom.component';

describe('FindroomComponent', () => {
  let component: FindroomComponent;
  let fixture: ComponentFixture<FindroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindroomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
