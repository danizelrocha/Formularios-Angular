import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor( private http: HttpClient) { }

/*   consultaCEP(cep: string) {

    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json/`);
      }
    }
  } */
}
