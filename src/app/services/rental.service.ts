import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Rental } from "../models/rental";
import { ReturnCreate } from "../models/rentalCreate";

@Injectable({
    providedIn: 'root'
})
export class RentalService {
    private baseUrl: string = 'https://localhost:44374/api/rental';

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

    public create(rental: ReturnCreate) {
        const url = `${this.baseUrl}/create`;
        return this.http.post(url, rental).toPromise();
    }

    public update(id: number, rental: Rental) {
        const url = `${this.baseUrl}/update/${id}`;
        return this.http.put(url, rental).toPromise();
    }

    public delete(id: number) {
        const url = `${this.baseUrl}/delete/${id}`;
        return this.http.delete(url).toPromise();
    }

    public getByCustomerId(customerId: number) {
        const url = `${this.baseUrl}/getByCustomerId/${customerId}`;
        return this.http.get(url).toPromise();
    }
    
    public returnRental(rentalId: number) {
        const url = `${this.baseUrl}/return/${rentalId}`;
        return this.http.get(url).toPromise();
    }
}