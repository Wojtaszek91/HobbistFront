import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAccComponent } from './confirm-account.component';

describe('ConfirmLoginComponent', () => {
  let component: ConfirmAccComponent;
  let fixture: ComponentFixture<ConfirmAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmAccComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
