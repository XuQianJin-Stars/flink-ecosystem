import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PackageList } from '../interfaces/package-list';

@Injectable({ providedIn: 'root' })
export class PackagesService {
  constructor(protected http: HttpClient) {}

  getPackages(category?: string): Observable<PackageList> {
    const base = '/api/v1/packages';
    const url = !!category ? `${base}/${category}` : base;

    return this.http.get<PackageList>(url);
  }

  getSearchPackages(query: string): Observable<PackageList> {
    const url = `/api/v1/packages?query=${query}`;
    return this.http.get<PackageList>(url);
  }

  getCategoryPackages(category: string): Observable<PackageList> {
    const url = `/api/v1/packages?query=tag:${category}`;
    return this.http.get<PackageList>(url);
  }
}
