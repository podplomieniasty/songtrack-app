import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const notFoundGuard: CanActivateFn = (route, state) => {
  const spotify = inject(SpotifyService);
  return spotify.getTrackById(route.paramMap.get('spotifyId')!).pipe(
    map((res: any) => {
      if(res.length > 0) {
        console.log(res.length);
        return true;
      } else {
        return inject(Router).createUrlTree(['/notfound']);
      }
    })
  )
};