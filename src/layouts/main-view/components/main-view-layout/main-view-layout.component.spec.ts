import { ComponentFixture, TestBed } from '@angular/core/testing';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastProviderComponent } from '@shared/ui/components/toast-provider/toast-provider.component';
import { AuthStoreModule } from '@store/modules/auth/auth.store.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { MainViewLeftPanelComponent } from '../main-view-left-panel/main-view-left-panel.component';
import { MainViewLayoutComponent } from './main-view-layout.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { generateMockAuthFacade } from '@mocks/facades/auth.facade.mock';
import { MainViewNavbarComponent } from '../main-view-navbar/main-view-navbar.component';
import { MainViewFooterComponent } from '../main-view-footer/main-view-footer.component';

describe('MainViewLayoutComponent', () => {
  let component: MainViewLayoutComponent;
  let fixture: ComponentFixture<MainViewLayoutComponent>;
  let childSidePanel: DebugElement;
  let authFacade: AuthFacade;

  beforeEach(async () => {
    authFacade = generateMockAuthFacade();
    await TestBed.configureTestingModule({
      declarations: [MainViewLayoutComponent],
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        AuthStoreModule,
        ToastProviderComponent,
        MainViewLeftPanelComponent,
        MainViewNavbarComponent,
        MainViewFooterComponent,
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
        })
      ],
      providers: [{ provide: AuthFacade, useValue: authFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(MainViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    childSidePanel = fixture.debugElement.query(
      By.directive(MainViewLeftPanelComponent)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger method on click button', () => {
    spyOn(component, 'signOut');
    const logoutButton = childSidePanel.query(By.css('#logout-btn'));
    logoutButton.triggerEventHandler('click', null);
    expect(component.signOut).toHaveBeenCalled();
  });

  it('should trigger authFacade method', () => {
    component.signOut();
    expect(authFacade.signOut).toHaveBeenCalled();
  });

  it('should close menu if this is open on xs dimensions', () => {
    const dummyElement = document.createElement('div');
    document.getElementById = jasmine
      .createSpy('HTML Element')
      .and.returnValue(dummyElement);
    component.signOut();
    expect(authFacade.signOut).toHaveBeenCalled();
  });
});
