import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PerfilService } from '../service/perfil.service';

@Injectable()
export class AuthGuard implements CanActivate {
    usuario: any;

    constructor(private router: Router, private perfilService: PerfilService) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.usuario = this.perfilService.getSession();

        if (this.usuario && this.usuario.token) { 
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
