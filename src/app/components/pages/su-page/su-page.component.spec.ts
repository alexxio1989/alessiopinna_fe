import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuPageComponent } from './su-page.component';

describe('SuPageComponent', () => {
  let component: SuPageComponent;
  let fixture: ComponentFixture<SuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
