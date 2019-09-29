import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocardComponent } from './cryptocard.component';

describe('CryptocardComponent', () => {
  let component: CryptocardComponent;
  let fixture: ComponentFixture<CryptocardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
