import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviguationComponent } from './naviguation.component';

describe('NaviguationComponent', () => {
  let component: NaviguationComponent;
  let fixture: ComponentFixture<NaviguationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NaviguationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NaviguationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
