import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YieldreportComponent } from './yieldreport.component';

describe('YieldreportComponent', () => {
  let component: YieldreportComponent;
  let fixture: ComponentFixture<YieldreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YieldreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YieldreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
