import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCorsoComponent } from './card-corso.component';

describe('CardCorsoComponent', () => {
  let component: CardCorsoComponent;
  let fixture: ComponentFixture<CardCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
