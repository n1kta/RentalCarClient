import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private router: Router,
        private authenticationService: AuthenticationService) {
    }

    async canActivate() {
        const token = localStorage.getItem("token");

        if (token) {
            var response = await this.authenticationService.isAdmin() as boolean;
            if (response) {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }

        return false;
    }
}