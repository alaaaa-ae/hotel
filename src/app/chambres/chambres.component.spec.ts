import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChambresComponent } from './chambres.component';
import { FormsModule } from '@angular/forms';

describe('ChambresComponent', () => {
  let component: ChambresComponent;
  let fixture: ComponentFixture<ChambresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChambresComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChambresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter rooms based on search term', () => {
    component.ngOnInit();
    component.searchTerm = 'deluxe';
    component.filterRooms();
    expect(component.filteredRooms.length).toBe(1);
    expect(component.filteredRooms[0].name).toContain('Deluxe');
  });

  it('should filter rooms based on capacity', () => {
    component.ngOnInit();
    component.filterCapacity = 4;
    component.filterRooms();
    expect(component.filteredRooms.length).toBe(1);
    expect(component.filteredRooms[0].name).toContain('Familiale');
  });

  it('should select a room', () => {
    component.ngOnInit();
    const testRoom = component.rooms[0];
    component.selectRoom(testRoom);
    expect(component.selectedRoom).toBe(testRoom);
  });
});