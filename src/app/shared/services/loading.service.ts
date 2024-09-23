import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();
  private requestCount = 0;

  constructor() { }

  show() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this._isLoading.next(true);
    }
  }

  hide() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this._isLoading.next(false);
    }
  }
}
