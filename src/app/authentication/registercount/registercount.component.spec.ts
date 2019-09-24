import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistercountComponent } from './registercount.component';

describe('RegistercountComponent', () => {
  let component: RegistercountComponent;
  let fixture: ComponentFixture<RegistercountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistercountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistercountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
