import { Component, Input, OnInit} from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { IProduct } from 'src/app/shared/types/product-d-t';
import { IReviewType } from 'src/app/shared/types/product-d-t';
import { REVIEW_API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-product-details-area',
  templateUrl: './product-details-area.component.html',
  styleUrls: ['./product-details-area.component.scss']
})
export class ProductDetailsAreaComponent implements OnInit {
  @Input() product:IProduct | undefined;
  productReviews: IReviewType[] = [];

  constructor(private httpRequestService: HttpRequestService){}

  ngOnInit(): void {
    //get item reviews
    this.getReviews();
  }

  getReviews(){
    this.httpRequestService.getRequest(REVIEW_API_URL, `?productId=${this.product?.id}`).subscribe({
      next: (res: IReviewType[]) => {
        this.productReviews = res
      },
    });
  }

  reCallReviews(check: boolean){
    if (check) this.getReviews();
  }
}