import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CiteService {
  private citeApi = environment.backendUrl + "api/cites";

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  // Vérifie si un bailleur a déjà au moins une cité
  checkIfBailleurHasCity(id_bailleur: string): Observable<any>{
    return this.http.get(`${this.citeApi}/bailleur/${id_bailleur}`);
  }

  // Ajouter une cité
  addCite(cite: any): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.citeApi, cite, {
      headers,
      withCredentials: true
    });
  }


  // Récupérer les cités avec une pagination
  getCities(page: number, pageSize: number): Observable<any> {
    const url = `${this.citeApi}/${page}/${pageSize}`;
    return this.http.get<any>(url);
  }

  // Récupérer les informations d'une seulle cité
  getOneCity(id: string): Observable<any>{
    return this.http.get<any>(`${this.citeApi}/${id}`);
  }
}
