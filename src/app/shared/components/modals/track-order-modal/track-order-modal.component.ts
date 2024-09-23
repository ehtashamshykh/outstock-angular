import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StepperOrientation } from '@angular/material/stepper';
import { map, Observable } from 'rxjs';
import { IEvent} from 'src/app/shared/types/trackPackage-d-t';

@Component({
  selector: 'app-track-package-modal',
  templateUrl: './track-order-modal.component.html',
  styleUrls: ['./track-order-modal.component.scss'],
})
export class TrackOrderModalComponent {
  stepperOrientation!: Observable<StepperOrientation>;
  trackingEvents: IEvent[] = [];
  events = [
    { label: 'Shipped', defaultMessage: 'Not shipped yet' },
    { label: 'In Transit', defaultMessage: 'Facility Processing' },
    { label: 'Out for delivery', defaultMessage: 'Not dispatched' },
    { label: 'Delivered', defaultMessage: 'Not delivered yet' }
  ];

  constructor(
    private dialogRef: MatDialogRef<TrackOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
      this.trackingEvents = this.data
  }

  cancel(){
    this.dialogRef.close();
  }
}
