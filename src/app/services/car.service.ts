import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Car } from "../models/car";

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private baseUrl: string = 'https://localhost:44374/api/car';

    constructor(private http: HttpClient) {

    }

    public getById(id: number) {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url).toPromise();
    }

    public getAll() {
        const url = `${this.baseUrl}/getAll`;
        return this.http.get(url).toPromise();
    }

    public getAvailable(filter: any) {
        const url = `${this.baseUrl}/getAvailable`;
        return this.http.post(url, filter).toPromise();
    }

    public create(car: Car) {
        const url = `${this.baseUrl}/create`;
        return this.http.post(url, car).toPromise();
    }

    public update(id: number, car: Car) {
        const url = `${this.baseUrl}/update/${id}`;
        return this.http.put(url, car).toPromise();
    }

    public delete(id: number) {
        const url = `${this.baseUrl}/delete/${id}`;
        return this.http.delete(url).toPromise();
    }
}