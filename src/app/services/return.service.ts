import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Return } from "../models/return";

@Injectable({
    providedIn: 'root'
})
export class ReturnService {
    private baseUrl: string = 'https://localhost:44374/api/return';

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

    public create(ret: Return) {
        const url = `${this.baseUrl}/create`;
        return this.http.post(url, ret).toPromise();
    }

    public update(id: number, ret: Return) {
        const url = `${this.baseUrl}/update/${id}`;
        return this.http.put(url, ret).toPromise();
    }

    public delete(id: number) {
        const url = `${this.baseUrl}/delete/${id}`;
        return this.http.delete(url).toPromise();
    }
}