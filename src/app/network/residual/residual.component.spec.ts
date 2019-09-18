import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidualComponent } from './residual.component';

describe('ResidualComponent', () => {
  let component: ResidualComponent;
  let fixture: ComponentFixture<ResidualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
