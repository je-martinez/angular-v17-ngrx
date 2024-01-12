import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLayoutService {
  private topProgressBarBS = new BehaviorSubject<boolean>(false);
  public topProgressBar$ = this.topProgressBarBS.asObservable();

  public showTopProgressBar(value: boolean): void {
    this.topProgressBarBS.next(value);
  }
}
