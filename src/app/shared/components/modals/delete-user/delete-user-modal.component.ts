import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticateService } from 'src/app/shared/services/aws-cognito.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent {
  constructor(private dialogRef: MatDialogRef<DeleteUserModalComponent>,
    private toastrService: ToastrService,
    private router: Router,
    private authenticateService: AuthenticateService
  ) {}

  deleteUser(){
    this.authenticateService.deleteUser();
    this.toastrService.success("Account deleted successfully");
    setTimeout(()=>{
      localStorage.clear();
      this.router.navigate(['/pages/login']);
    }, 1000)
  }
}
