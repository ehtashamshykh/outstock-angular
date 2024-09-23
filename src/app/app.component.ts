import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthenticateService } from './shared/services/aws-cognito.service';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title: string = 'OpsGrove - Exploring Amazon Web Services';

  isLoading!: Observable<boolean>;

  constructor(private authenticateService: AuthenticateService, private loadingService: LoadingService, private cdr: ChangeDetectorRef) {
    this.refreshToken();
  }

  ngAfterContentChecked() {
    this.isLoading = this.loadingService.isLoading$;
    this.cdr.detectChanges();
  }

  refreshToken() {
    const intervalDuration: number = 1500000; // 25 mins
    const lastExecutionTime: number = Number(localStorage.getItem('lastExecutionTime')) || 0;
    const isLoggedIn = localStorage.getItem("username");
    if (isLoggedIn) {
      const remainingSessionTime: number = Math.max(intervalDuration - (Date.now() - lastExecutionTime), 0);
      setTimeout(() => {
        this.authenticateService.fetchAuthSession();
        localStorage.setItem('lastExecutionTime', Date.now().toString());

        setInterval(() => {
          this.authenticateService.fetchAuthSession();
          localStorage.setItem('lastExecutionTime', Date.now().toString());
        }, 1500000);
      }, remainingSessionTime);
    }
  }

}