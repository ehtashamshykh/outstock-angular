import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})

export class ExtraInfoComponent {
  username: string = '';

  constructor(private router: Router, private authenticateService: AuthenticateService, private toastrService: ToastrService){
    const name = localStorage.getItem("username");
    this.username = name ? JSON.parse(name) : '';
    this.authenticateService.isUserSignedIn.subscribe((isUserSignedIn: boolean) => {
      if(isUserSignedIn){
        const name = localStorage.getItem("username");
        this.username = name ? JSON.parse(name) : '';
      }
    })
  }

  signOut(){
    this.authenticateService.signOut().then(response=>{
      this.toastrService.success("Successfully signed out!");
      this.router.navigate(['/pages/login']);
      this.username = '';
      this.authenticateService._isUserSignedIn.next(false);
      localStorage.clear();
    });
  }

  signIn(){
    this.router.navigate(['/pages/login']);
  }
}