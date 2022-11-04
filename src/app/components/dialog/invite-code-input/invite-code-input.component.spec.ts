import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCodeInputComponent } from './invite-code-input.component';

describe('InviteCodeInputComponent', () => {
  let component: InviteCodeInputComponent;
  let fixture: ComponentFixture<InviteCodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteCodeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCodeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
