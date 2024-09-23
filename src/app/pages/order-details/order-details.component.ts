import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ITrackPackage } from 'src/app/shared/types/trackPackage-d-t';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { PLACE_ORDER_API_URL } from 'src/envirornments/environment';
import { TrackOrderModalComponent } from 'src/app/shared/components/modals/track-order-modal/track-order-modal.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  username: string = '';
  trackingEvents: IEvent[] = [];

  constructor(
    public cartService: CartService,
    private httpRequestService: HttpRequestService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    const name = localStorage.getItem('username');
    this.username = name ? JSON.parse(name) : '';
    
    if(this.username){
      this.httpRequestService.getRequest(PLACE_ORDER_API_URL, `/${this.route.snapshot.paramMap.get("id")}/track`).subscribe({
        next: (res: ITrackPackage) => { 
          if (res) {
            if (res.events) {
              res.events.forEach((event: IEvent) => {
                this.trackingEvents.push({
                  description: event.description,
                  location: event.location,
                  status: event.status,
                  timestamp: event.timestamp
                });
              });
            }
          }
        },
      }); 
      }
  }

  trackOrderDialog(){
    this.dialog.open(TrackOrderModalComponent, {
      width: "auto",
      data: this.trackingEvents
    });
  }

}
