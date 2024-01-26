import { Injectable } from '@angular/core';
import {
  Auth,
  GithubAuthProvider,
  GoogleAuthProvider,
  User
} from '@angular/fire/auth';
import { environment } from '@env/environment';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { hashString } from '@shared/utils/encryption.utils';
import { Observable, from, map, of } from 'rxjs';
import { USER_LOCAL_STORAGE_KEY } from '../constants/auth.constants';
import { SignUpOrLoginFormDTO } from '../types/auth.DTOs';
import { AuthUtils } from '../utils/auth.utils';

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

  removeUserFromLocalStorage() {
    this.localStorageS.removeItem(USER_LOCAL_STORAGE_KEY);
  }

  getUserFromLocalStorage(): Observable<User | undefined> {
    const user = this.localStorageS.getItem(USER_LOCAL_STORAGE_KEY);
    return of(user ? JSON.parse(user) : undefined);
  }

  signInWithGoogle(): Observable<User> {
    return from(
      AuthUtils.signInWithPopup(this.auth, new GoogleAuthProvider())
    ).pipe(map((userCredential) => userCredential.user.toJSON() as User));
  }

  signInWithGithub(): Observable<User> {
    return from(
      AuthUtils.signInWithPopup(this.auth, new GithubAuthProvider())
    ).pipe(map((userCredential) => userCredential.user.toJSON() as User));
  }

  signInWithEmailAndPassword({
    email,
    password
  }: SignUpOrLoginFormDTO): Observable<User> {
    const hashPassword = hashString(
      password,
      environment.encryption.passwordKey
    );
    return from(
      AuthUtils.signInWithEmailAndPassword(this.auth, email, hashPassword)
    ).pipe(map((userCredential) => userCredential.user.toJSON() as User));
  }

  createAccount({ email, password }: SignUpOrLoginFormDTO): Observable<User> {
    const hashPassword = hashString(
      password,
      environment.encryption.passwordKey
    );
    return from(
      AuthUtils.createUserWithEmailAndPassword(this.auth, email, hashPassword)
    ).pipe(map((userCredential) => userCredential.user.toJSON() as User));
  }

  sendEmailVerification(): Observable<void> {
    return from(AuthUtils.sendEmailVerification(this.auth.currentUser!));
  }

  signOut(): Observable<void> {
    return from(AuthUtils.signOut(this.auth));
  }

  sendPasswordResetEmail(email: string): Observable<void> {
    return from(AuthUtils.sendPasswordResetEmail(this.auth, email));
  }
}
