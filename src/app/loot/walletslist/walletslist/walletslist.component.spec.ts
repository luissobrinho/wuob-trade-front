import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletslistComponent } from './walletslist.component';

describe('WalletslistComponent', () => {
  let component: WalletslistComponent;
  let fixture: ComponentFixture<WalletslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
