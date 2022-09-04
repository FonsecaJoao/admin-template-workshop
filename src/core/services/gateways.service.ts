import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GatewaysService {
  constructor(private httpClient: HttpClient) {}

  getGateways(): Observable<Object> {
    return this.httpClient.get(`${environment.apiUrl}gateways`);
  }
}
