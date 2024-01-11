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
import { SignUpFormDTO } from '../types/auth.DTOs';

@Injectable({
  providedIn: 'root'
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

  signInWithGoogle(): Observable<User> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      map((userCredential) => userCredential.user.toJSON() as User)
    );
  }

  signInWithEmailAndPassword({
    email,
    password
  }: SignUpFormDTO): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential) => userCredential.user.toJSON() as User)
    );
  }

  createAccount({ email, password }: SignUpFormDTO): Observable<User> {
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
