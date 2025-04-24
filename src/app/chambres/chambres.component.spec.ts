import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChambresComponent } from './chambres.component';

describe('ChambresComponent', () => {
  let component: ChambresComponent;
  let fixture: ComponentFixture<ChambresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambresComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});