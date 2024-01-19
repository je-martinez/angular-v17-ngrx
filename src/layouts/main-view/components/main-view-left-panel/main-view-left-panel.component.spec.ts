import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { MainViewLeftPanelComponent } from './main-view-left-panel.component';
import { mockLoggedUser } from '@mocks/data/users.mock';
import { By } from '@angular/platform-browser';

describe('MainViewLeftPanelComponent', () => {
  let component: MainViewLeftPanelComponent;
  let fixture: ComponentFixture<MainViewLeftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewLeftPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainViewLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render elements based on input', () => {
    component.user = mockLoggedUser;
    fixture.detectChanges();
    const elPhoto = fixture.debugElement.query(By.css('#profilePhoto'));
    const elDisplayName = fixture.debugElement.query(By.css('#displayName'));
    const elDisplayEmail = fixture.debugElement.query(By.css('#displayEmail'));
    expect(
      elPhoto.nativeElement.src.includes(mockLoggedUser.photoURL)
    ).toBeTrue();
    expect(
      elDisplayName.nativeElement.textContent.includes(
        mockLoggedUser.displayName
      )
    ).toBeTrue();
    expect(
      elDisplayEmail.nativeElement.textContent.includes(mockLoggedUser.email)
    ).toBeTrue();
  });

  it('should not render photo if is not provided on input', () => {
    const mockUser = { ...mockLoggedUser };
    mockUser.photoURL = null;
    component.user = mockUser;
    fixture.detectChanges();
    const elPhoto = fixture.debugElement.query(By.css('#profilePhoto'));
    expect(elPhoto).toBeNull();
  });

  it('should signOut when the button logout is pressed', fakeAsync(() => {
    spyOn(component, 'onSignOut');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.onSignOut).toHaveBeenCalled();
  }));

  it('should emit on signOut when the button logout is pressed', () => {
    const emitSpy = spyOn(component.signOut, 'emit');

    component.onSignOut();

    expect(emitSpy).toHaveBeenCalled();
  });
});
