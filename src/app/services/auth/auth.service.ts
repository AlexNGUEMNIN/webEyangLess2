import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = environment.backendUrl + "auth";
  private readonly endpoints = {
    BAILLEUR: `${environment.backendUrl}user/bailleur`,
    LOCATAIRE: `${environment.backendUrl}user/locataire`,
    MODERATEUR: `${environment.backendUrl}user/moderateur`,
  }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // Se connecter et récupérer le token en retour
  login(username: string, password: string) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.authUrl}/login`, { username, password },
      { headers: this.headers, withCredentials: true }
    )
      .pipe(
        tap((response: any) => {
          // Vérifier si la réponse contient un statut UNAUTHORIZED
          if (response.status === 'UNAUTHORIZED') {
            throw new Error('Authentification échouée'); // Force à tomber dans le bloc error
          }
          // Stockage du token après authentification
          localStorage.setItem('user', response);
        })
      )
  }


  addBailleur(user: any): Observable<any> {
    if (!user) {
      throw new Error('Les données du bailleur sont requises');
    }
    return this.http.post<any>(this.endpoints.BAILLEUR, user, {
      headers: this.headers, withCredentials: true
    });
  }

  /**
   * Ajoute un locataire
   * @param user Les données du locataire
   * @returns Un Observable avec la réponse du serveur
   */
  addLocataire(user: any): Observable<any> {
    if (!user) {
      throw new Error('Les données du locataire sont requises');
    }
    return this.http.post<any>(this.endpoints.LOCATAIRE, user, {
      headers: this.headers, withCredentials: true
    });
  }

  /**
   * Ajoute un modérateur
   * @param user Les données du modérateur
   * @returns Un Observable avec la réponse du serveur
   */
  addModerateur(user: any): Observable<any> {
    if (!user) {
      throw new Error('Les données du modérateur sont requises');
    }
    return this.http.post<any>(this.endpoints.MODERATEUR, user,{
      headers: this.headers, withCredentials: true
    });
  }


  verifyOTP(email: string, otp: string):Observable<any>{
    return this.http.post<any>(`${this.authUrl}/verify-otp`, {email: email, otp: otp});
  }


  // Définit le rôle à Invité
  setRoleAsGuest(){
    localStorage.setItem('role', 'guest');
  }

  // Vérifie si un email existe déjà
  checkIfEmailExists(email: string):Observable<any>{
    return this.http.get(`${environment.backendUrl}user/email/${email}`);
  }


  // Fonctions pour Changer le mot de passe
  passwordForgot(email: string):Observable<any>{
    return this.http.post(`${environment.backendUrl}auth/password/forgot`, {email});
  }

  passwordVerifyOtp(email: string, otp: string): Observable<any>{
    return this.http.post(`${environment.backendUrl}auth/password/verify-otp`, {
      email, otp
    });
  }

  passwordReset(email: string, otp: string, newPassword: string, confirmPassword: string): Observable<any>{
    return this.http.post(`${environment.backendUrl}auth/password/reset`, {
      email, otp, newPassword, confirmPassword
    });
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
