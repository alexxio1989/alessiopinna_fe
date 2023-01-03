import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescrizioniComponent } from './descrizioni.component';

describe('DescrizioniComponent', () => {
  let component: DescrizioniComponent;
  let fixture: ComponentFixture<DescrizioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescrizioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescrizioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
