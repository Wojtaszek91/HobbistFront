import { AppModule } from './../app/app.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
        ProfileComponent
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    component = fixture.nativeElement;
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  })
})
