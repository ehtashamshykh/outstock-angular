import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestService } from 'src/app/shared/services/http-request.service';
import { REVIEW_API_URL } from 'src/envirornments/environment';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent{
  contactForm: FormGroup;
  @Input() productId: string | undefined;
  @Output() reviewCallCheck: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private httpRequestService: HttpRequestService, private toastrService: ToastrService) {
    this.contactForm = new FormGroup({
      ratingValue: new FormControl('', Validators.required),
      reviewText: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
     // add review
      const payload = {
        productId: this.productId,
        reviewText: this.contactForm.value.reviewText,
        rating: this.contactForm.value.ratingValue,
      };
      this.httpRequestService.postRequest(REVIEW_API_URL, payload).subscribe({
        next: () => {
          this.reviewCallCheck.emit(true);
          this.toastrService.success("Review has been added");
          this.contactForm.reset()
        },
        error: async (err) => {
          this.toastrService.error(err?.message);
        },
      });
    }
  }
}
