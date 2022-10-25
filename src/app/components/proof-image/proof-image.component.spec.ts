import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofImageComponent } from './proof-image.component';

describe('ProofImageComponent', () => {
  let component: ProofImageComponent;
  let fixture: ComponentFixture<ProofImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
