import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Brand } from '../_model/brand';

export class BrandListResolver implements Resolve<Brand[]> {
    constructor() {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Brand[] | Observable<Brand[]> | Promise<Brand[]> {
        throw new Error('Method not implemented.');
    }

}
