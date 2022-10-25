import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorManagerComponent } from './floor-manager.component';

describe('FloorManagerComponent', () => {
  let component: FloorManagerComponent;
  let fixture: ComponentFixture<FloorManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
