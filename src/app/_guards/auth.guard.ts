import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PerfilService } from '../service/perfil.service';

@Injectable()
export class AuthGuard implements CanActivate {
    roteamento: Router;
    usuario: any;

    constructor(private router: Router, private perfilService: PerfilService) {
        this.roteamento = router
    }

    canActivate() {
        this.usuario = this.perfilService.getSession();

        if (this.usuario && this.usuario.token) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}
