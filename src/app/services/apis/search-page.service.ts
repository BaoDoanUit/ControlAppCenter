import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchPersonResultModel } from 'src/app/models/person.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchPageService {
  constructor(private http: HttpClient) {}

}
