import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';

@Component({
  selector: 'sign-up-form',
  standalone: true,
  imports: [RouterModule],
  providers: [AuthService],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  constructor(private auth: AuthService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onGoogleSignUp() {
    this.auth
      .loginWithGoogle()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          console.log({ data });
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
