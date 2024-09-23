import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private httpClient: HttpClient, private loadingService: LoadingService) {}

  /**
   * get method
   * @param url api url
   * @param endpoint any endpoint
   * @returns observable
   */
  getRequest(url: string, endpoint: string | any): Observable<any> {
    this.loadingService.show();
    return this.httpClient.get(`${url}${endpoint}`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * get method by id
   * @param url api url
   * @param endpoint any endpoint
   * @returns observable
   */
  getByIdRequest(url: string, endpoint: string): Observable<any> {
    this.loadingService.show();
    return this.httpClient.get(`${url}${endpoint}`).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * post method
   * @param url api url
   * @param payload payload as object
   * @returns observable
   */
  postRequest(url: string, payload: any): Observable<any> {
    this.loadingService.show();
    return this.httpClient.post(url, payload).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * put method
   * @param url api url
   * @param endpoint any endpoint
   * @param payload payload as object
   * @returns observable
   */
  updateRequest(url: string, endpoint: string, payload: any): Observable<any> {
    this.loadingService.show();
    return this.httpClient.put(`${url}${endpoint}`, payload).pipe(
      finalize(() => this.loadingService.hide())
    );
  }

  /**
   * delete method
   * @param url api url
   * @param payload any payload
   * @returns observable
   */
  deleteRequest(url: string, payload?: any): Observable<any> {
    this.loadingService.show();
    if (!payload) return this.httpClient.delete(url);
    return this.httpClient.request('DELETE', url, {
      body: payload,
    }).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
