import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { ReplaySubject, catchError, from, map, of, Observable } from 'rxjs';
import { USER_LOCAL_STORAGE_KEY } from '../constants/auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  saveUserOnLocalStorage(user: User) {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromLocalStorage(): Observable<User | undefined> {
    const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    return of(user ? JSON.parse(user) : undefined);
  }

  loginWithGoogle(): Observable<User> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      map((userCredential) => userCredential.user.toJSON() as User)
    );
  }
}
