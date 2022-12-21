import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCorsoComponent } from './detail-corso.component';

describe('DetailCorsoComponent', () => {
  let component: DetailCorsoComponent;
  let fixture: ComponentFixture<DetailCorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCorsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
