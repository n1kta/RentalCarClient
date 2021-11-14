import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private baseUrl: string = 'https://localhost:44374/api/user';

    constructor(private http: HttpClient) {

    }

    public isAdmin() {
        const url = `${this.baseUrl}/isAdmin`;
        return this.http.get(url).toPromise();
    }

    public getCurrentCustomer() {
        const url = `${this.baseUrl}/getCurrent`;
        return this.http.get(url).toPromise();
    }

    public logIn(credentials: any) {
        const url = `${this.baseUrl}/login`;
        return this.http.post(url, credentials, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).toPromise();
    }

    public registration(credentials: any) {
        const url = `${this.baseUrl}/register`;
        return this.http.post(url, credentials, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).toPromise();
    }

    public logOut() {
        localStorage.removeItem("token");
    }
}