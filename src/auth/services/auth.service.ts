import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { from, map, of, Observable } from 'rxjs';
import { USER_LOCAL_STORAGE_KEY } from '../constants/auth.constants';
import { SignUpOrLoginFormDTO } from '../types/auth.DTOs';
import { LocalStorageService } from 'src/shared/services';
import { encryptString } from 'src/shared/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: Auth,
    private localStorageS: LocalStorageService
  ) {}

  saveUserOnLocalStorage(user: User) {
    this.localStorageS.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage(): Observable<User | undefined> {
    const user = this.localStorageS.getItem(USER_LOCAL_STORAGE_KEY);
    return of(user ? JSON.parse(user) : undefined);
  }

  signInWithGoogle(): Observable<User> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      map((userCredential) => userCredential.user.toJSON() as User)
    );
  }

  signInWithEmailAndPassword({
    email,
    password
  }: SignUpOrLoginFormDTO): Observable<User> {
    const encryptPassword = encryptString(
      password,
      environment.encryption.passwordKey
    );
    return from(
      signInWithEmailAndPassword(this.auth, email, encryptPassword)
    ).pipe(map((userCredential) => userCredential.user.toJSON() as User));
  }

  createAccount({ email, password }: SignUpOrLoginFormDTO): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(map((userCredential) => userCredential.user.toJSON() as User));
  }

  sendEmailVerification(): Observable<void> {
    return from(sendEmailVerification(this.auth.currentUser!));
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }
}
