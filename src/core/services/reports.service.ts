import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportPayload } from '../interfaces/report-payload';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private httpClient: HttpClient) {}

  sendReport(payload: ReportPayload): Observable<Object> {
    return this.httpClient.post(`${environment.apiUrl}report`, payload);
  }
}
