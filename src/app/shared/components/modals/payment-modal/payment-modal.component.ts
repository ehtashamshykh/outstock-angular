import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent {

  paymentMethodId: string = this.data.userDetail[0].id;

  constructor(
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ }

  onSubmit() {
    this.dialogRef.close(this.paymentMethodId);
  }

  cancel(){
    this.dialogRef.close();
  }
}
