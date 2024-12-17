import { HttpInterceptorFn } from "@angular/common/http";

export const UserInterceptor: HttpInterceptorFn = (req, next) => {
    if(req.url.includes('omdbapi.com')) return next(req);
    const token = localStorage.getItem('token');
    if(token) {
        const authReq = req.clone({
            setHeaders: {
                'x-auth-token': `Bearer ${token}`
            }
        });
        return next(authReq);
    } else {
        return next(req);
    }
}