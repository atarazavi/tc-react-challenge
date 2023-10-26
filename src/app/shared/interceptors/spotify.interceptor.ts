import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthorizationService } from '#shared/services/auth/authorization.service';

@Injectable()
export class SpotifyInterceptor implements HttpInterceptor {
    constructor(private authorizationService: AuthorizationService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(this.addAuthorizationHeader(request)).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Handle the refresh token logic here
                    return this.authorizationService.getAccessToken().pipe(
                        switchMap((tokenResponse) => {
                            // Updating the request with the new token
                            const cloned = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${tokenResponse.access_token}`
                                }
                            });
                            return next.handle(cloned);
                        })
                    );
                }
                // Additional error handling can be added here
                return throwError(error);
            })
        );
    }

    private addAuthorizationHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
        const token = this.authorizationService.getAccessTokenSync(); // Sync method to get token
        if (token) {
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return request;
    }
}
