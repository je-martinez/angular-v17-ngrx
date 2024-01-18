import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewLayoutComponent } from './main-view-layout.component';
import { AuthStoreModule } from '@store/modules/auth/auth.store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastProviderComponent } from '@shared/ui/components/toast-provider/toast-provider.component';
import { MainViewLeftPanelComponent } from '../main-view-left-panel/main-view-left-panel.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainViewLayoutComponent', () => {
  let component: MainViewLayoutComponent;
  let fixture: ComponentFixture<MainViewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainViewLayoutComponent],
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        AuthStoreModule,
        ToastProviderComponent,
        MainViewLeftPanelComponent,
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
