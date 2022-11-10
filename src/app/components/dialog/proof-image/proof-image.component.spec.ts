import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofImageDialogComponent } from './proof-image-dialog.component';

describe('ProofImageComponent', () => {
  let component: ProofImageDialogComponent;
  let fixture: ComponentFixture<ProofImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
